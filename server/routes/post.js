const express = require('express');
const multerS3 = require('multer-s3')
const path = require('path')
let AWS = require('aws-sdk')
const dotenv = require('dotenv')
const multer = require('multer')
const moment = require('moment')
dotenv.config()


const router = express.Router();
// DB연결 (Maria DB)
const mydb = require('../models/DB')
const db = mydb.db
// S3설정
AWS.config.loadFromPath(__dirname+"/../awsconfig.json")
const s3 = new AWS.S3()
console.log(s3)
const uploadS3 = multer({
    storage: multerS3({
        s3,
        bucket: "devminj/upload",
        region: "ap-northeast-2",
        key(req, file, cb){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext)
            cb(null, basename + new Date().valueOf() + ext)
        }
    }),
    limits:{fileSize: 100*1024*1024},
})
console.log(uploadS3.storage)

// GET /category
// 카테고리 목록 전부 불러오기
router.get("/category", (req,res)=>{
    let qry = "delete from categories where categorynum = 0"
    db.query(qry, function(err,qryRes,field){
        if(err){
            console.log("카테고리 제거 실패")
            console.log(err);
        }
        else{
            console.log("존재 하지 않는 카테고리 제거함")
        }
    })
    qry = "select * from categories"
    db.query(qry, function(err,qryRes,field){
        if(err){
            res.status(500).json({
                err:err
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            res.json({
                categories: resJson
            })
        }
    })
})
//GET /category/:categoryname
// 특정 카테고리 게시물 전부 불러오기.
router.get('/category/:categoryname', (req,res)=>{
    const name = req.params.categoryname
    console.log(name);
    let ids = []
    let qry = "select postid from posts_categories where categoryname = ?"
    db.query(qry, [name], function(err, qryRes, field){
        console.log(qryRes)
        if(err){
            res.status(500).json({
                err:err,
                message: `${name}카테고리에서 포스트 id가져오기 실패함`
            })
        }
        else{
            ids = JSON.parse(JSON.stringify(qryRes))
            console.log(ids);
            let id = []
            
            for(let i = 0; i < ids.length; i++){
                id.push(JSON.stringify(ids[i].postid))
            }
            console.log("ids",ids);
            console.log(id);
            qry = "select * from posts where postid in (?)"
            db.query(qry, [id], function(err2, qryRes2, field){
                    if(err2){
                        res.status(500).json({
                            err:err2
                        })
                    }
                    else{
                        let resJson = JSON.parse(JSON.stringify(qryRes2))
                        res.status(200).json({
                            content: resJson
                        })
                    }
            })
        }
    })

})
// GET /api/post
// 게시물 전부 불러오기
router.get('/', (req, res) =>{//req = request res = response
    const id = req.body.id
    let qry = `select * from posts`
    const params = []
    db.query(qry, params, function(err, qryRes, fields){
        if(err){
            console.log(err)
            res.status(500).json({
                postLoadSuccess: false,
                err: err
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            for(let i = 0; i < resJson.length; i++){
                console.log(resJson[i].postid);
                console.log(resJson[i].contents);
                console.log(resJson[i].imageurl);
            }
            res.status(200).json({
                content: resJson
            })
        }
    })
})
// POST /api/post
// 게시물 업로드(CREATE)
router.post('/', uploadS3.none(),(req, res) =>{
    const {title, owner, contents, fileUrl, category} = req.body
    const date = moment().format("YYYY-MM-DD hh:mm:ss")
    let qry = `insert into posts(title, owner, contents, imageUrl, date) values(?,?,?,?,?)`
    let postUpload = false
    let params = [title, owner, contents, fileUrl, date]
    db.query(qry, params, function(err, qryRes, fields){
        if(err){
            console.log("/api/post/ ERR!")
            console.log(err)
        }
        else{
            postUpload = true
        }
    })
    let id;
    db.query("select last_insert_id()",[], function(err, qryRes, fields){
        let resJson = JSON.parse(JSON.stringify(qryRes))
        console.log("lastID");
        console.log(resJson);
        id = resJson[0]["last_insert_id()"]
        console.log(id);
    })
    let categories =[];
    for(let i = 0; i < category.length; i++ ){
        categories.push([category[i], 1])
    }
    qry = `insert ignore into categories values ? on duplicate key update categorynum = categorynum + 1`
    console.log(categories)
    let categoryUpload = false
    db.query(qry,[categories], function(err, qryRes, fields){
        qry = `insert ignore into posts_categories(postid, categoryname) values ?`
        categories = [];
        for(let i = 0; i < category.length; i++ ){
            categories.push([id, category[i]])
        }
        db.query(qry, [categories], function(err, qryRes, fields){
            if(err){
                console.log(err)
            }
            else{
                categoryUpload = true
                if(postUpload && categoryUpload){
                    res.status(200).json({
                        uploadSuccess: true,
                        postid: id
                    })
                }
                else{
                    res.status(500).json({
                        uploadSuccess: false
                    })
                }
            }
        })
    })
})

// GET /api/post/id
// 특정 게시물 보기(READ)
router.get('/:id', (req,res) =>{
    const postid = req.params.id
    console.log(postid+"번 게시물 불러온다잉~")
    let qry = `select * from posts where postid = ?`
    db.query(qry, [postid], function(err, qryRes, fields){
        let resJson = JSON.parse(JSON.stringify(qryRes))
        console.log("!!!!!!!!!!!!!!!!!!!",resJson.length)
        if(err){
            console.log(err)
            res.status(500).json({
                onePostLoadSuccess: false,

            })
        }
        else if(resJson.length == 0){
            res.status(200).json({
                onePostLoadSuccess: false,
                info: {}
            })
        }
        else{
            console.log(resJson);
            res.status(200).json({
                onePostLoadSuccess: true,
                info: resJson[0]
            })
        }
    })
})
// POST /:id/delete
// 특정 게시글 삭제(DELETE)
router.post('/:id/delete',(req,res)=>{
    const postid = req.params.id
    
    let qry = "delete from posts where postid = ?"
    db.query(qry, [postid], function(err, qryRes, fields){
        if(err){
            res.status(500).json({
                deleteSuccess: false,
                err: err
            })
        }
        
    })
    qry = "delete from comments where postid = ? "
    db.query(qry, [postid], function(err, qryRes, fields){
        if(err){
            res.status(500).json({
                deleteSuccess: false,
                err: err
            })
        }
        console.log("===Delete Comments===");
        console.log(qryRes);
    })
    qry = "select categoryname from posts_categories where postid = ?"
    db.query(qry, [postid], function(err, qryRes, fields){
        if(err){
            res.status(500).json({
                deleteSuccess: false,
                err: err
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            console.log(resJson);
            console.log(resJson.length);
            const names = []
            for(let i = 0; i < resJson.length; i++){
                names.push((resJson[i].categoryname))
            }
            console.log(names);
            console.log(names.join());
            
            qry = "update categories set categorynum = categorynum - 1 where categoryname in (?)"
            db.query(qry, [names],function(err2,qryRes2, fields){
                if(err2){
                    res.status(500).json({
                        deleteSucces: false,
                        err: err2
                    })
                }
                else{
                    console.log("UPDATE CATEGORIES");
                    console.log(qryRes2);
                    qry = "delete from posts_categories where postid = ?"
                    db.query(qry, [postid], function(err3,qryRes2,fields){
                        if(err3){
                            res.status(500).json({
                                deleteSucces:false,
                                err:err3
                            })
                        }
                        else{
                            console.log("DELETE POSTS_CATEGORIES");
                            console.log(qryRes2);
                            res.status(200).json({
                                deleteSucces:true
                            })
                        }
                    })
                }
            })
        }
    })

})
// GET /:id/edit
// 특정 게시글 수정(Update)
router.get('/:id/edit', (req,res) =>{
    const postid = req.params.id
    let qry = "select * from posts postid = ?"
    db.query(qry, [postid], function(err,qryRes,field){
        if(err){
            res.status(500).json({
                err: err
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            res.json({
                info: resJson[0]
            })
        }
    })
})
router.post("/:id/edit",(req,res)=>{
    const postid = req.params.id
    const {title, owner, contents, fileUrl} = req.body
    const date = moment().format("YYYY-MM-DD hh:mm:ss")
    let qry = `update posts set title = ?, owner = ?, contents = ?, imageurl  = ? where postid = ?`
    console.log("글 내용");
    console.log(contents);
    const params = [title, owner, contents, fileUrl, postid]
    let debug = db.query(qry, params, function(err, qryRes, field){
        console.log(debug.sql);
        if(err){
            res.status(500).json({
                postEditSuccess: false,
                err:err
            })
        }
        else{
            res.status(200).json({
                postEditSuccess: true
            })
        }
    })
})

// GET /:id/category
// 특정 게시물 카테고리 불러오기.
router.get("/:id/category",(req,res)=>{
    const postid = req.params.id
    console.log(postid,"카테고리 불러온다~");
    let qry = "select categoryname from posts_categories where postid = ?"
    db.query(qry, [postid],function(err, qryRes, field){
        if(err){
            res.status(500).json({
                err:err
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            res.json({
                posts_categories: resJson
            })
        }
    })
})

// /api/post/image
router.post('/image',uploadS3.array("upload", 5), async(req, res, next)=>{
    console.log("/api/post/image")
    try {
        console.log(req.files.map((v) => v.location));
        res.json({
            upload:true,
            url: req.files.map((v)=> v.location)
        })
    } catch (e) {
        console.error(e)
        res.json({
            upload: false,
            url: null
        })
    }
})
module.exports = router;