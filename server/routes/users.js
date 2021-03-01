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

router.post('/register', (req, res) =>{//req = request res = response
    console.log(req.body)
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role
    bcrpyt.hash(password, 10, function(err, hashPassword){
        console.log("Hashed passwd:" + hashPassword)
        let qry = `insert into users(id, name, email, password, role) values(?,?,?,?,?)`
        const params = [id, name, email, hashPassword, role]
        db.query(qry, params, function(err, qryRes, fields){
            if(err){
                console.log(err)
                res.status(500).json({
                    success: false,
                    err: err
                })
            }
            else{
                res.status(200).json({
                    success: true
                })
            }
        })
    })
})

router.post('/login', (req, res) =>{
    const id = req.body.id//로그인 시도 하는 아이디
    const password = req.body.password 
    console.log(id+" "+password)
    let idqry = "select id, password from users where id = ?"
    db.query(idqry, [id], function(err, rows, fields){
        console.log(rows)
        if(rows.length == 0){
            return res.status(500).json({
                loginSuccess: false,
                message: "존재하지 않는 ID"
            })
        }
        if(err){
            console.log(err)
            res.json({
                loginSuccess: false,
                message: "ERR!!"
            })
        }
        else{
            let resJson = JSON.parse(JSON.stringify(rows))
            bcrpyt.compare(password, resJson[0].password, function(err, isMatch){
                if(!isMatch)//비밀번호 틀림
                    return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
                else{//비밀 번호 맞음
                    let token = jwt.sign(resJson[0].id, 'secretToken')
                    let updateQurey = "update users set token = ? where id = ?"
                    db.query(updateQurey,[token,id],function(err){
                        if(err){
                            console.log(err)
                            res.json({
                                loginSuccess:false,
                                message: "Token 생성 실패"
                            })
                        }
                        else{
                            console.log("TOKEN!!!"+token)
                            res.cookie("x_auth",token).status(200).json({loginSuccess: true, userID: id, message: "로그인성공!"})
                        }
                    })
                }
            })
        }
    })
    
})
router.get('/auth', auth, (req,res)=>{
    //두번째 인자 auth는 미들웨어
    //Request를 받고 CallBack 하기전에 중간에 무언가를 하는것
    // 여기가 실행되면 Authentication 이 True이다.
    res.status(200).json({
        id : req.user.id,
        isAdmin: req.user.role === "Admin" ? true : false,
        isAuth: true,
        email: req.user.email,
        role: req.user.role,
    })
})
router.get('/logout', auth, (req, res)=>{
    let qry = 'update users set token = "" where id = ?'
    db.query(qry, [req.user.id], (err, rows, fields)=>{
        if(err){
            return res.json({success:false, err})
        }
        return res.status(200).send({
            success:true
        })
    })
})

module.exports = router;