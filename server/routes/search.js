const express = require('express');
const dotenv = require('dotenv')
const moment = require('moment')
dotenv.config()
const router = express.Router();
// DB연결 (Maria DB)
const mydb = require('../models/DB')
const db = mydb.db

// GET /api/post
// 게시물 전부 불러오기
router.get('/:search', (req, res) =>{//req = request res = response
    const keyword = req.params.search
    console.log(keyword);
    let qry = `select * from posts`
    db.query(qry, function(err, qryRes, fields){
        if(err){
            console.log(err)
            res.status(500).json({
                postLoadSuccess: false,
                err: err
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(qryRes))
            const ret = []
            for(let i = 0; i < resJson.length; i++){
                if(resJson[i].title.includes(keyword)){
                    ret.push(resJson[i])
                }
            }
            res.status(200).json({
                content: ret
            })
        }
    })
})
module.exports = router;