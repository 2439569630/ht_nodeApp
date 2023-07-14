const express = require('express');
const router = express.Router();
const pool = require('../db/index')
const readRSA = require('./../RSA/readRSA')
// 创建 HTTP 错误对象
const createError = require('http-errors');
router.route('/logon')
    .post((req, res, next) => {
        // 已经登录的重定向
        // if (req.session.userID) {
        //     if (req.session.userID) {
        //         res.json({ isAuthenticated: true })
        //     } else {
        //         res.json({ isAuthenticated: false })
        //     }
        //     return
        // }   
        next()
    })
    .post((req, res, next) => {
        // 验证规则
        if (req.body['uesname'] !== '' && req.body['password'] !== '') {
            if (req.body['uesname'].length <= 32 && req.body['password'].length <= 128) {
                const sql = `select * from staff where id = ?`
                pool.query(sql, [req.body['uesname']], (error, result, fields) => {
                    if (error) {
                        next(createError(500, '服务器错误'))
                    }
                    if (result[0]) {
                        const { id, permissionID, name,password } = result[0]
                        if (String(req.body['password']) === String(password)) {
                            req.id = id
                            req.permissionID = permissionID
                            req.name = name
                            next()
                        }
                        else {
                            console.log(result)
                            next(createError(404, '账号或密码错误'))
                        }
                        
                    }
                    else {
                        console.log(result)
                        next(createError(403, '账号或密码错误'))
                    }
                })
            }
            else {
                next(createError(402, '用户名长度不能超过32个字符，密码长度不能超过128个字符'))
            }
        }
        else {
            next(createError(401, '账号或密码不能为空'))
        }
    })
    /**
     * 处理用户登录请求
     * @param {Object} req - Express 请求对象
     * @param {Object} res - Express 响应对象
     * @param {Function} next - Express 中间件函数
     */
    .post((req, res, next) => {
        const session = req.session  
        // 在 session 对象中存储用户 ID
        session['userID'] = req.id  
        // 名称
        session['name'] = req.name  
        // 在 session 对象中存储用户权限
        session['permission'] = req.permissionID  
        res.status(200)
        res.send({msg: '登录成功'})
        next()
    })
    .post((req, res, next) => {
        // req.ipInfo
        // ip: 用户的 IP 地址。
        // error: 如果无法获取 IP 地址信息，则包含错误信息。
        // range: IP 地址所属的 CIDR 范围。
        // country: IP 地址所在的国家/地区代码。
        // region: IP 地址所在的地区代码。
        // eu: 如果 IP 地址位于欧盟内，则为 1，否则为 0。
        // timezone: IP 地址所在时区。
        // city: IP 地址所在城市。
        // ll: 包含纬度和经度信息的数组。
        // metro: IP 地址所在城市的地铁代码。
        // area: IP 地址所在地区的面积代码。
        const sql = `INSERT INTO user_login_records (user_id, login_time, login_location, ip_address, login_device) VALUES (?, NOW(), ?, ?, ?);`
            pool.query(sql, [parseInt(req.id),req.ipInfo.error ? '未知地点': req.ipInfo.city, String(req.ipInfo.ip), String(req.headers['user-agent'])], (error, result, fields) => {
                if (error) {
                    console.log(error)
                }
            })
    })
    // 前端用来验证session
    .get((req, res, next) => {
        if (req.session.userID) {
            res.json({ isAuthenticated: true })
        }
        else {
            res.json({ isAuthenticated: false })
        }
    })
// 响应用户信息
router.route('/logon/uesrdata')
    .get((req, res, next) => {
        if (req.session.userID) {
            res.status(200)
            res.json({ 
                uesrdata: {
                    userID: req.session.userID,
                    name: req.session.name,
                    permission: req.session.permission
                }
            })
        }
        else {
            next(createError(404, '未登录'))
        }
})
// 登录记录响应
// 每次登录后响应一条上次登录的记录
router.route('/loginRecord')
    .get((req, res, next) => {
        if (req.session.userID) {
            const sql = 'select * from user_login_records where user_id = ?'
            pool.query(sql, [req.session.userID], (error, result, fields) => {
                
            })
        }
        else {
            next(createError(404, '未登录'))
        }
    })



router.route('/logon/exit')
    .get((req, res, next) => {
        req.session.destroy(err => {
            if (err) {
                next(createError(500, '服务器错误'))
            } else {
                res.send('退出登录成功')
            }
        })
    })


// 根据状态码返回err的信息给用户，没有状态码就返回500服务器错误信息
router.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.end(err.message.toString())
})



module.exports = router