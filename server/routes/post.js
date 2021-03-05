const express = require('express');
const router = express.Router();
// DB연결 (Maria DB)
const mydb = require('../models/DB')
const db = mydb.db
//brypt
const bcrpyt = require('bcrypt')
//jsonwebtoken
const jwt = require('jsonwebtoken')
const {auth} = require('../middleware/auth')
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

module.exports = router;