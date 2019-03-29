var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

const fs = require('fs');
const bodyParser = require('body-parser')
const multer = require('multer')
var app = express();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var web_api = require('./routes/web_api');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('wetr'));
app.use(session({
    secret :  'wetr', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
    },
}));

app.use('/public',express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('avatar'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', web_api);




app.post('/api/upload_avatar', function (req, res) {
    var thisfile = req.files[0];
    console.log(thisfile);  // 上传的文件信息

    var des_file = __dirname + "/" + thisfile.originalname;
    fs.readFile( thisfile.path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:thisfile.originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
})



// app.post('/api/upload_avatar',function (req, res) {
//     console.log(req.files[0]);
//     var des_file = __dirname + "/" + req.files[0].originalname;
//     fs.readFileSync()
//
//
// })







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
