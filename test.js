
var user_name = 'fd';
var sql = `select isnull((select top(1) 1 from users where user_name== '${user_name}'), 0)`;
console.log(sql)