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
        }
    })
})


var login = function(){
    app.post("/api/login/user", function(req,res){
        console.log(req.body.userId);
        check(req.body.userId, req.body.userPwd);
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

// app.get('/api/adduser', function(req,res){
//     res.json(addUser)
// })
// // app.get("/api/login", function(req, res){
// //     res.json(userLogin);
// // })

// app.post('/api/adduser', function(req,res){
//     addUser.push(req.body);
//     add(req.body.name, req.body.email, req.body.id, req.body.pwd);
// })
// var add = function(name, email, id, pwd){
//     pool.getConnection(function(err, conn){
//         if(err) throw err;
//         conn.query("INSERT INTO user_info SET ?",
//             {
//                 user_name: name,
//                 user_email: email,
//                 user_id: id,
//                 user_pwd:pwd
//             }, function(err, res){
//                 if(err) throw err;
//             })
//     })
// }
app.listen(PORT, function(){
    console.log("app listening on PORT : " + PORT);
})

