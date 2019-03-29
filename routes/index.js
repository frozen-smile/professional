var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('用户',req.session.userName)
    console.log('用户',req.session)
    console.log('用户',req.id)
    res.render('index', { title: '灰色森林的树洞小屋' });
});

router.get('/login',function (req, res) {
    res.render('web/login')
})

router.get('/essay',function (req, res) {
    res.render('web/essay')
})

router.get('/article',function (req, res) {
    res.render('web/article')
})

router.get('/album',function (req, res) {
    res.render('web/album')
})

router.get('/message',function (req, res) {
    res.render('web/message')
})

router.get('/about',function (req, res) {
    res.render('web/about')
})

router.get('/personal',function (req, res) {
    res.render('manage/personal')
})

module.exports = router;
