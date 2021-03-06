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

    qry = `select * from categories where categoryname = ?`
    let categoryUpload = false
    db.query(qry,[category], function(err, qryRes, fields){
        if(qryRes == 0){
            qry = 'insert into categories(categoryname) values(?)'
            db.query(qry, [category], function(err,qryRes,fields){
                if(err){
                    console.log(err)
                }
            })
        }
        qry = `insert into posts_categories(postid, categoryname) values(?,?)`
        params = [id, category]
        db.query(qry, params, function(err, qryRes, fields){
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