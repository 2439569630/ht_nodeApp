/**
 * 本模块负责向前端传递公钥
 * @module secretkey
 * 
 */
const express = require('express');
const router = express.Router();
const readRSA = require('./readRSA')

// 判断公钥是否已经生成
router.use((req, res, next) => {
    readRSA.Public_key() 
    .then(key => {
        if (key) {
            req.key = key
            next()
        }
        else {
            res.status(503)
            res.send({
                code: 503,
                msg: '服务器当前不可用'
            })
        }
    })
    .catch(error => {
        res.status(503)
        res.send({
            code: 503,
            msg: '服务器当前不可用'
        })
        console.error(error)
    })
})

router.use((req, res, next) => {
    res.send(req.key)
})












module.exports = router