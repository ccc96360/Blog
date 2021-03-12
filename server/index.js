const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/users', require('./routes/users'))
app.use('/api/post', require('./routes/post'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/search', require('./routes/search'))

app.get('/api/hello',(req,res) =>{
    res.send('안녕하세요~!')
})
 
const port = process.env.PORT
app.listen(port, ()=> console.log(`App Listening`))


