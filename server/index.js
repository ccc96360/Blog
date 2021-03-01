const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/users', require('./routes/users'))

app.get('/api/hello',(req,res) =>{
    res.send('안녕하세요~!')
})
 
const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`Example app test ${port}`))


