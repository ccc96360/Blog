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

// GET /category
// 카테고리 목록 전부 불러오기
router.get("/category", (req,res)=>{
    let qry = "delete from categories where categorynum = 0"
    db.query(qry, function(err,qryRes,field){
        if(err){
            console.log(err)
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
    
    let ids = []
    let qry = "select postid from posts_categories where categoryname = ?"
    db.query(qry, [name], function(err, qryRes, field){
        
        if(err){
            res.status(500).json({
                err:err,
                message: `${name}카테고리에서 포스트 id가져오기 실패함`
            })
        }
        else{
            ids = JSON.parse(JSON.stringify(qryRes))
            
            let id = []
            
            for(let i = 0; i < ids.length; i++){
                id.push(JSON.stringify(ids[i].postid))
            }
            
            
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

// GET /skip/:skip
// skip부터 6개 게시글 불러온다.(최신 날짜 순)
router.get("/skip/:skip", (req,res)=>{
    const n = req.params.skip
    let qry = "select postid from posts"
    const ids = []
    db.query(qry,function(err, qryRes){
        let r = JSON.parse(JSON.stringify(qryRes));
        r.forEach(v => {
            ids.push(v.postid)
        });        
        
        qry = `select * from posts order by date desc limit ${n},6`
        db.query(qry,function(err2,qryRes2,fields){
            if(err2){
                
                res.status(500).json({
                    postLoadSuccess: false,
                    err:err2
                })
            }
            else{
                let resJson = JSON.parse(JSON.stringify(qryRes2))
                
                res.status(200).json({
                    loading: true,
                    count: ids.length,
                    content: resJson,
                    allids: ids
                })
            }
        })
    })
})


// GET /api/post
// 게시물 전부 불러오기
router.get('/', (req, res) =>{//req = request res = response
    let qry = `select * from posts`
    const params = []
    db.query(qry, params, function(err, qryRes, fields){
        if(err){
            
            res.status(500).json({
                postLoadSuccess: false,
                err: err
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            for(let i = 0; i < resJson.length; i++){
                
                
                
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
            
            
        }
        else{
            postUpload = true
        }
    })
    let id;
    db.query("select last_insert_id()",[], function(err, qryRes, fields){
        let resJson = JSON.parse(JSON.stringify(qryRes))
        id = resJson[0]["last_insert_id()"]
    })
    let categories =[];
    for(let i = 0; i < category.length; i++ ){
        categories.push([category[i], 1])
    }
    qry = `insert ignore into categories values ? on duplicate key update categorynum = categorynum + 1`
    let categoryUpload = false
    db.query(qry,[categories], function(err, qryRes, fields){
        qry = `insert ignore into posts_categories(postid, categoryname) values ?`
        categories = [];
        for(let i = 0; i < category.length; i++ ){
            categories.push([id, category[i]])
        }
        db.query(qry, [categories], function(err, qryRes, fields){
            if(err){
                console.log(err);
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
    
    let qry = `select * from posts where postid = ?`
    db.query(qry, [postid], function(err, qryRes, fields){
        let resJson = JSON.parse(JSON.stringify(qryRes))
        
        if(err){
            
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
            
            
            const names = []
            for(let i = 0; i < resJson.length; i++){
                names.push((resJson[i].categoryname))
            }
            
            
            
            qry = "update categories set categorynum = categorynum - 1 where categoryname in (?)"
            db.query(qry, [names],function(err2,qryRes2, fields){
                if(err2){
                    res.status(500).json({
                        deleteSucces: false,
                        err: err2
                    })
                }
                else{
                    
                    
                    qry = "delete from posts_categories where postid = ?"
                    db.query(qry, [postid], function(err3,qryRes2,fields){
                        if(err3){
                            res.status(500).json({
                                deleteSucces:false,
                                err:err3
                            })
                        }
                        else{
                            
                            
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
    
    
    const params = [title, owner, contents, fileUrl, postid]
    let debug = db.query(qry, params, function(err, qryRes, field){
        
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
    
    try {
        
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