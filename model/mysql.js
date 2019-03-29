var mysql = require('mysql')


var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'professional',
    port:'3306'
});

connection.connect(function (err) {
    if(err){
        console.log(`错误;${err}`);
        return;
    }
    console.log('success');
})

module.exports = connection