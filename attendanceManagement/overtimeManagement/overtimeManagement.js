const express = require('express');
const router = express.Router();
const pool = require('./../../db/index');
const createError = require('http-errors');

// 权限验证和日志记录中间件
router.use((req, res, next) => {

    if (req.session.userID) {
        return next();
    }
    res.send('请登录');
});

// 查询加班记录的路由
router.post('/overtimeManagement', (req, res, next) => {
    if (!req.body) {
        throw createError(400, '请求体不能为空');
    }   

    const { page, rows } = req.body;
    
    if (!page || !rows) {
        throw createError(400, 'page、rows不能为空');
    }
    if (page <= 0 || rows <= 0) {
        throw createError(400, 'page、rows必须大于0');
    }
    if (rows > 300) {
        throw createError(400, 'rows不能大于300');
    }
    
    const sql = 'SELECT * FROM overtime_records LIMIT ? OFFSET ?';
    pool.query(sql, [Number(rows), Number((page - 1) * rows)], (error, result, fields) => {
        if (error) {
            console.error(error);
            next(createError(500, '服务器错误'));
        } else {
            res.json(result);
        }
    });
});

// 查询加班记录总数的路由
router.post('/overtimeManagement/pagingData', (req, res, next) => {
    const sql = 'SELECT COUNT(*) AS total_rows FROM overtime_records';
    pool.query(sql, (error, result, fields) => {
        if (error) {
            next(createError(500, '服务器错误'));
        } else {
            res.json(result[0]);
        }
    });
});

// 添加加班记录路由
router.post('/overtimeManagement/addOvertime', (req, res) => {
    res.send('添加加班记录');
});

// 错误处理中间件
router.use((err, req, res, next) => {

    res.status(err.status || 500);
    res.end(err.message.toString());
});

module.exports = router;
