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
        bucket: "devminj/upload/",
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
// /api/post
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
// /api/post
// 게시물 업로드
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
    qry = `insert into categories values ? on duplicate key update categorynum = categorynum + 1`
    console.log(categories)
    let categoryUpload = false
    db.query(qry,[categories], function(err, qryRes, fields){
        qry = `insert into posts_categories(postid, categoryname) values ?`
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
                        uploadSuccess: true
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

// /api/post/id
// 특정 게시물 보기
router.get('/:id', (req,res) =>{
    const postid = req.params.id
    console.log(postid+"번 게시물 불러온다잉~")
    let qry = `select * from posts where postid = ?`
    db.query(qry, [postid], function(err, qryRes, fields){
        if(err){
            console.log(err)
            res.status(500).json({
                onePostLoadSuccess: false
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            console.log(resJson);
            res.status(200).json({
                info: resJson[0]
            })
        }
    })
})
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
        let resJson = JSON.parse(JSON.stringify(qryRes))
        /*console.log(qryRes);
        console.log(JSON.stringify(qryRes));
        console.log(resJson);*/
        
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