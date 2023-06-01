const express = require('express')
const server = express()
const cors = require('cors')
const leftList = require('./list/index')
const pool = require('./db/index')
const listData = require('./list/listdata')
const Delete = require('./list/delete')
const Post = require('./list/post')
const modify = require('./list/modify')
const AddData = require('./list/addData')
server.use(cors({
    // origin: 'http://localhost:5173',
    origin: '*'
}))




// 列表路由
server.use('/list', leftList)


// 列表数据路由
server.use('/data', listData)
// 删除数据
server.use('/delete', Delete)
// 响应岗位
server.use('        ', Post)
// 修改数据
server.use('/modify', modify)
// 添加数据
server.use('/adddata', AddData)


const hostname = '0.0.0.0';
server.listen(9999, hostname,() => {
    console.log('服务器启动成功！');
    pool.query('SELECT 1', (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0 && results[0]['1'] === 1) {
            console.log('已经成功连接到数据库');
        } else {
            console.log('连接数据库失败');
        }
    });
})



