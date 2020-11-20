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
    port     : 3306,
    user     : 'root',
    password : "dmwm9191@A",
    database : 'test',
    debug    :  false
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, "./login/login.html"));
})

let addUser = [];
app.get('/api/adduser', function(req,res){
    res.json(addUser);
})
app.post('/api/adduser', function(req,res){
    addUser.push(req.body);
    add(req.body.id, req.body.pwd);
})

var add = function(id, pwd){
    pool.getConnection(function(err, conn){
        if(err) throw err;
        const query = conn.query("INSERT INTO user_info SET ?",
            {
                user_id: id,
                user_pwd:pwd
            })
        console.log(query.sql);
        pool.end();
    })
}
app.listen(PORT, function(){
    console.log("app listening on PORT : " + PORT);
})

