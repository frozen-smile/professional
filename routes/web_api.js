var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('../model/mysql');


//注册
router.post('/register',function (req,res) {
    console.log(req.body)
    var  addSql = 'INSERT INTO users(user_name,password) VALUES(?,?)';
    var  addSqlParams = [req.body.user_name, req.body.password];
    mysql.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            res.send({"status":"400","msg":"ERR"});
            res.end()
            return;
        }
        console.log('INSERT result:',result);

        res.send({"status":"200","msg":"OK"});
        res.end();

    });
})
//判断用户名是否被占用
router.get('/search_user',function (req,res) {
    console.log(req.query)
    var searchSql = 'select * from users where user_name = ?';
    mysql.query(searchSql,req.query.user_name,function (err, result) {
        if(err){
            console.log('[select ERROR] - ',err.message);
            res.send({"status":"400","msg":"ERR"})
            res.end();
            return;
        }
        if (result.length==0){
            res.send({"status":"200","msg":"OK"})
        }else {
            res.send({"status":"200","msg":"NOT"})
        }
        console.log('result:',result);
        res.end()
    });
})
//登录
router.post('/login',function (req,res) {
    console.log(req.body)
    var  sql = 'select * from users where user_name = ?';
    mysql.query(sql,req.body.user_name,function (err, result) {
        if(err){
            console.log('[search ERROR] - ',err.message);
            res.send({"status":"400","msg":"ERR"});
            res.end()
            return;
        }
        console.log('search result:',result);
        if (result.length==0){
            res.send({"status":"200","msg":"NONE"})
        }else if (result[0].password == req.body.password){
            req.session.userName = req.body.user_name; // 登录成功，设置 session
            res.cookie()
            // res.redirect(301,'/');

            res.send({"status":"200","msg":"OK"})
        }else{
            res.send({"status":"200","msg":"NOT"})
        }
        res.end()

    });
})




module.exports = router;
