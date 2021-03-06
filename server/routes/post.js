const express = require('express');
const multerS3 = require('multer-s3')
const path = require('path')
let AWS = require('aws-sdk')
const dotenv = require('dotenv')
const multer = require('multer')
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
router.post('/',(req, res) =>{
    const {title, owner, contents, fileUrl} = req.body
    let qry = `insert into posts(title, owner, contents, imageUrl) values(?,?,?,?)`
    params = [title, owner, contents, fileUrl||"https://source.unsplash.com/random/301x201"]
    db.query(qry, params, function(err, qryRes, fields){
        if(err){
            console.log("/api/post/ ERR!")
            console.log(err)
        }
        else{
            res.status(200).json({
                success: true
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