var login = function(app){
    app.post("/api/login", function(req,res){
    userLogin.name = req.body.userId;
    userLogin.pwd = req.body.userPwd;
    check(req.body.userId, req.body.userPwd);
})
}

var check = function(id, pwd){
    pool.getConnection(function(err, res){
        if(err) throw err;
        res.query('SELECT user_name FROM user_info WHERE user_id=? AND user_pwd=?',
        [id, pwd]
        ,function(err, res){
            if(err){
                console.log("no data found");
            }
            console.log(res);
        }
        )
    })
}

module.exports = login;