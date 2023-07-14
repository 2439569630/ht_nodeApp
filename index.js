const express = require('express')
const server = express()
const cors = require('cors')
const pool = require('./db/index')
const hostname = require('./db/hostConfig')
const session = require('express-session');
// fileStore中间件可以把用户的session数据保存在文件中。默认配置当收到session时候会自动在根目录下创建sessions文件夹，在其中以json的形式保存收到的用户session。
const FileStore = require('session-file-store')(session)
// 创建 HTTP 错误对象
const createError = require('http-errors');
// 获取ip中间件
const expressip = require('express-ip')



// const RedisStore = require('connect-redis');(session);
// const redisClient = require('redis').createClient();

server.use(expressip().getIpInfoMiddleware)


server.use(
    session({
    secret: '12345-67890-09876-54321', // 必选配置
    resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    cookie: { 
        secure: false, 
        maxAge: 30 * 60 * 1000, 
        httpOnly: false 
    },
    name: 'session-id', // 可选，设置个session的名字
    store: new FileStore() // 可选，使用fileStore来保存session，如未指定就会默认使用memoryStore
}))


server.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
    // origin: '*',
    

}))
// express.urlencoded中间件只能解析application/x-www-form-urlencoded类型的POST请求参数。
server.use(express.urlencoded({ extended: true }));
console.log(hostname)


// 设置响应头编码
server.use((req, res, next) => {
    // 设置响应头的编码
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 在后端服务器配置中设置响应头
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader('SameSite', 'None');

    next();
});




// 登录
server.use('/ues', require('./logon/logon'))

// 判断是否登录中间件
const checkLogin = (req, res, next) => {
    if (req.session.userID) {
        // session ID 有效，继续处理请求
        next()
    } else {
        // session ID 无效，删除包含该 session ID 的 cookie
        res.clearCookie('connect.sid')
        res.status(401).send('无效的 session')
    }
}

// 列表路由
server.use('/list', checkLogin, require('./list/index'))


// 列表数据路由
server.use('/data', checkLogin, require('./list/listdata'))
// 删除数据
server.use('/delete', checkLogin, require('./list/delete'))
// 响应岗位
server.use('/post', checkLogin, require('./list/post'))
// 修改数据
server.use('/modify', checkLogin, require('./list/modify'))
// 添加数据
server.use('/adddata', checkLogin, require('./list/addData'))







// secretkey 
// server.post('/secretkey', secretkey)






// 错误处理中间件
// 处理用户无效的路由返回404，通常写在路由的最后，当之前的路由都不能匹配就匹配404
server.use((req, res, next) => {
    next(createError(404,'页面不存在'))
})

// 根据状态码返回err的信息给用户，没有状态码就返回500服务器错误信息
server.use((err, req, res,next)=> {
    res.status(err.status || 500)
    res.end(err.message.toString())
})

server.listen(hostname.port, hostname.host, () => {
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



