const {USER, PASSWD, SCHEMA} = require('./Config.js')
const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',//host 객체 = 마리아 DB가 존재하는 서버의 주소
    user: `${USER}`,//user객체 -마리아 DB 계정
    password: `${PASSWD}`,
    database: `${SCHEMA}`
})
db.connect(function(err){
    if(err){
        console.log("MySQL Connection caused ERR!")
    }
    else{
        console.log("MySQL is connected successfully.")
    }
})
module.exports = {db}