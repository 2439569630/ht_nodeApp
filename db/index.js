const mysql = require('mysql')


// 创建一个连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'huangyf1028',
    database: 'htyggl'
})

module.exports = pool