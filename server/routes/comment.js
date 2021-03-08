const express = require('express');
const momnet = require('moment');
const dotenv = require('dotenv')
dotenv.config()


const router = express.Router();
// DB연결 (Maria DB)
const mydb = require('../models/DB')
const db = mydb.db

// /api/comment/:id
// 게시글 댓글 불러오기
router.get('/:id', (req,res) =>{
    const postid = req.params.id
    console.log(postid+"번 게시물 댓글들~")
    let qry = `select commentid, owner, contents, date from comments where postid = ?`
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

// /api/comment/:id
// 게시글 댓글 달기
router.post('/:id', (req,res) =>{
    const postid = req.params.id
    const {owner, contents} = req.body
    const date = moment().format("YYYY-MM-DD hh:mm:ss")
    console.log(postid+"번 게시물 댓글들~")
    let qry = `insert into comments(owner,contents,postid,date) values(?,?,${postid}, ${date})`
    db.query(qry, [owner,contents], function(err, qryRes, fields){
        if(err){
            console.log(err)
            res.status(500).json({
                commentUpload: false
            })
        }
        else{
            res.status(200).json({
                commentUpload = true
            })
        }
    })
})
module.exports = router;