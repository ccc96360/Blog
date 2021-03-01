const { JsonWebTokenError } = require('jsonwebtoken');
const mydb = require('../models/DB')
const db = mydb.db
const jwt = require('jsonwebtoken')

let auth = (req, res, next)=>{
    //인증 처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    if(token === undefined){
        return res.json({
            isAuth:false, error:true, meesage:"cookie에 token없음"
        })
    }
    console.log("TOKEEENNN!!!"+token)
    // 토큰을 복호화 한후 유저를 찾는다.
    jwt.verify(token, 'secretToken',function(err, decoded){
        const userID = decoded
        let qry = "select * from users where id = ?"
        db.query(qry,[userID],(err, rows, fields) => {
            const resJson = JSON.parse(JSON.stringify(rows))
            console.log(resJson)
            console.log(token)
            console.log(rows.length+" "+resJson.length)
            console.log(rows.length === 0)
            console.log(token !== resJson[0].token)

            if(err){
                console.log(err)
                return res.json({
                    isAuth:false, error:true, meesage:"Back에서 auth중 에러 발생", errMessage:err
                })
            }
            if(rows.length === 0 || token !== resJson[0].token){
                return res.json({
                    isAuth: false, error: true
                })
            }
            req.token = token
            req.user = resJson[0]
            next()
        })
    })

    //유저가 있으면 인증 

    //없으면 인증 안함!
}
module.exports = {auth};