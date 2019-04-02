var express = require('express');
var router = express.Router();
const mysql = require('../model/mysql');
var fs = require('fs')
var path = require('path')


//注册
router.post('/register',function (req,res) {
    console.log(req.body)
    var  addSql = 'INSERT INTO users(user_name,password) VALUES(?,?)';
    var  addSqlParams = [req.body.user_name, req.body.password];
    mysql.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('注册报错：',err.message);
            res.send({"status":"400","msg":"ERR"});
            res.end()
            return;
        }

        var dirpath = path.join(__dirname,'../public/img/avatar'+req.body.user_name)
        fs.mkdirSync(dirpath)

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
            console.log('查询用户名是否被占用报错：',err.message);
            res.send({"status":"400","msg":"ERR"})
            res.end();
            return;
        }
        if (result.length==0){
            res.send({"status":"200","msg":"OK"})
        }else {
            res.send({"status":"200","msg":"NOT"})
        }
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
            // req.session.user_name = req.body.user_name; // 登录成功，设置 session
            // req.session.user_avatar = '/public/img/avatar/avatar.jpg';
            res.cookie('user_name',req.body.user_name, {
                'maxAge': 1000 * 3600 * 12,
                'signed': true,
                'httpOnly': true,
            })
            console.log('数据库查询头像结果' + result[0].avatar)
            var avatar = result[0].avatar ? result[0].avatar : '';
            res.cookie('avatar',avatar, {
                'maxAge': 1000 * 3600 * 12,
                'signed': true,
                'httpOnly': true,
            })
            // res.redirect('back')
            res.send({"status":"200","msg":"OK"})
        }else{
            res.send({"status":"200","msg":"NOT"})
        }
        res.end()

    });
})
//退出登录
router.get('/quit',function (req,res) {
    // var referer = req.headers.referer;
    res.clearCookie('user_name')
    res.clearCookie('avatar')
    res.redirect('/');

    res.end()
})


//上传头像
router.post('/upload_avatar', function (req, res) {
    var user_name = req.signedCookies.user_name;
    var imgData = req.body.avatar;

    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var imgpath = path.join(__dirname,'../public/img/avatar/'+user_name+'/avatar.jpg')

    fs.writeFileSync(imgpath,dataBuffer)

    var sqp = 'update users set avatar = ? where user_name = ?';
    var avatar_path = '/public/img/avatar/' + user_name + '/avatar.jpg';
    var sqlParams = [avatar_path, user_name];
    mysql.query(sqp,sqlParams,function (err, result) {
        if(err){
            console.log('更换头像报错：',err.message);
            res.send({"status":"400","msg":"ERR"});
            res.end()
            return;
        }
        res.send({"status":"200","msg":"OK"});
        res.end();
    });
})


module.exports = router;
