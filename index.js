const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const mysql = require('mysql');
const { createSecureServer } = require('http2');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//===== MySQL 데이터베이스 연결 설정 =====//
var pool=mysql.createPool({
    connectionLimit : 10, 
    host     : 'localhost',
    port     : "3306",
    user     : 'root',
    password : "dmwm9191@A",
    database : 'test',
    debug    :  false
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, "./login/login.html"));
})

let addUser = [];
app.post('/api/adduser', function(req,res){
    console.log(req.body);
    addUser.push(req.body);
})

var add = function(id, pwd){
    console.log(id, pwd);
    pool.getConnection(function(err, conn){
        if(err) throw err;
        const id = addUser.id;
        const pwd = addUser.pwd;
        const query = conn.query("INSERT INTO user_info SET ?",
            {
                user_id: id,
                user_pwd:pwd
            })
        console.log(query.sql);
        pool.end();
    })
}


app.get('/api/adduser', function(req,res){
    console.log('check')
    res.json(addUser);
})

app.listen(PORT, function(){
    console.log("app listening on PORT : " + PORT);
})

