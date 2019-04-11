var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('用户session',req.session)
    console.log('用户cookie',req.signedCookies)

    var nick_name = req.signedCookies.user_name;
    var avatar_path = req.signedCookies.avatar;
    res.render('index', {nick_name: nick_name || '',avatar:avatar_path || ''});
});

router.get('/login',function (req, res) {
    var nick_name = req.signedCookies.user_name;
    var avatar_path = req.signedCookies.avatar;
    res.render('web/login', {nick_name: nick_name || '',avatar:avatar_path || ''});
})

router.get('/essay',function (req, res) {
    var nick_name = req.signedCookies.user_name;
    var avatar_path = req.signedCookies.avatar;
    res.render('web/essay', {nick_name: nick_name || '',avatar:avatar_path || ''});
})

router.get('/article',function (req, res) {
    var nick_name = req.signedCookies.user_name;
    var avatar_path = req.signedCookies.avatar;
    res.render('web/article', {nick_name: nick_name || '',avatar:avatar_path || ''});
})

router.get('/album',function (req, res) {
    var nick_name = req.signedCookies.user_name;
    var avatar_path = req.signedCookies.avatar;
    res.render('web/album', {nick_name: nick_name || '',avatar:avatar_path || ''});
})

router.get('/message',function (req, res) {
    var nick_name = req.signedCookies.user_name;
    var avatar_path = req.signedCookies.avatar;
    res.render('web/message', {nick_name: nick_name || '',avatar:avatar_path || ''});
})

router.get('/about',function (req, res) {
    var nick_name = req.signedCookies.user_name;
    var avatar_path = req.signedCookies.avatar;
    res.render('web/about', {nick_name: nick_name || '',avatar:avatar_path || ''});
})


//管理界面路由
router.get('/personal',function (req, res) {
    var nick_name = req.signedCookies.user_name;
    if (!nick_name){
        res.redirect('/login#hash=login')
        res.end()
    }
    var avatar_path = req.signedCookies.avatar;
    res.render('manage/personal', {nick_name: nick_name || '',avatar:avatar_path || ''});
})

router.get('/manage',function (req, res) {
    res.render('manage/manage')
})

router.get('/avatar',function (req, res) {
    res.render('manage/avatar')
})

router.get('/password',function (req, res) {
    res.render('manage/password')
})

module.exports = router;
