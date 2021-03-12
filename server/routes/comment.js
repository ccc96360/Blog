const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv')
dotenv.config()


const router = express.Router();
// DB연결 (Maria DB)
const mydb = require('../models/DB')
const db = mydb.db

// /api/comment/:id
// Comment Loading
router.get('/:id', (req,res) =>{
    const postid = req.params.id
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
                info: resJson
            })
        }
    })
})

// /api/comment/:id
// Comment Upload
router.post('/:id', (req,res) =>{
    const postid = req.params.id
    const {owner, contents} = req.body
    const date = moment().format("YYYY-MM-DD hh:mm:ss")
    let qry = `insert into comments(owner,contents,postid,date) values(?,?,\'${postid}\', \'${date}\')`
    db.query(qry, [owner,contents], function(err, qryRes, fields){
        if(err){
            res.status(500).json({
                commentUpload: false
            })
        }
        else{
            qry = `select commentid, owner, contents, date from comments where postid = ?`
            db.query(qry, [postid], function(err, qryRes, fields){
                if(err){
                    res.status(500).json({
                        onePostLoadSuccess: false
                    })
                }
                else{
                    let resJson = JSON.parse(JSON.stringify(qryRes))
                    res.status(200).json({
                        info: resJson[resJson.length-1]
                    })
                }
            })
        }
    })
})
module.exports = router;