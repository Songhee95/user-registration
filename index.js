const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const mysql = require('mysql');
const { SSL_OP_CISCO_ANYCONNECT } = require('constants');
const { connect } = require('http2');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//===== MySQL 데이터베이스 연결 설정 =====//
var connection=mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : "dmwm9191@A",
    database : 'test',
    debug    :  false
});

app.get('/join', function(req,res){
    res.sendFile(path.join(__dirname, "./login/join.html"));
});
app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname, "./login/login.html"))
})
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, "./main.html"));
})

let addUser = [];

connection.connect(function(err){
    if(err) throw err;
    app.post("/api/login", function(req,res){
        if(req.body.key === "true"){
            console.log("login beggning")
            login();
        }
    })

    app.post('/api/join', function(req,res){
        if(req.body.key ==="true"){
            console.log("join in begining");
            joinin();
        }
    })
})


var login = function(){
    app.post("/api/login/user", function(req,res){
        console.log(req.body.userId);
        check(req.body.userId, req.body.userPwd);
})
};
var joinin = function(){
    app.post("/api/adduser", function(req,res){
        console.log(req.body.name);
        console.log(req.body.email);
        add(req.body.name, req.body.email, req.body.id, req.body.pwd);
    })
}

var check = function(id, pwd){
    console.log("checking user data....")
    var query = "SELECT user_name FROM user_info ";
    query += "WHERE user_id=? AND user_pwd =?";
    connection.query(query, [id, pwd], function(err, res){
        if(err){
            console.log("no data found")
        }
        console.log("Hello " + res[0].user_name)
    })
}

var add = function(name, email, id, pwd){
    console.log("adding new user information");
    var query = "INSERT INTO user_info (user_name, user_email, user_id, user_pwd) ";
    query += "VALUES (?, ?, ?, ?)";
    connection.query(query, [name, email, id, pwd], function(err, res){
        if(err) throw err;
        console.log(res);
    })
}

app.listen(PORT, function(){
    console.log("app listening on PORT : " + PORT);
})

