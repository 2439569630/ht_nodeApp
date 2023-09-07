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

/**
 * 根据姓名查询加班记录
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 下一个中间件
 * @param {page} req.body.page 页码
 * @param {rows} req.body.rows 行数
 * 
 */
router.post('/overtimeManagement/searchName', async (req, res, next) => {
    try {
        if (!req.body) {
            throw createError(400, '请求体不能为空');
        }
        const requiredParams = ['page', 'rows', 'name'];
        for (const param of requiredParams) {
            if (!req.body[param]) {
                throw createError(400, `${param}不能为空`);
            }
        }

        const result = {
            total_rows: 0,
            data: []
        };
        // 查询总数和数据
        const countSql = 'SELECT COUNT(*) AS total_rows FROM overtime_records WHERE employee_name = ?';
        const dataSql = 'SELECT * FROM overtime_records WHERE employee_name LIKE(?) LIMIT ? OFFSET ?';
        const coun = new Promise((resolve, reject) => {
            pool.query(countSql, [req.body.name], (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0].total_rows);
                }
            });
        })
        const data = new Promise((resolve, reject) => {
            pool.query(dataSql, [`${req.body.name}`, Number(req.body.rows), Number((req.body.page - 1) * req.body.rows)], (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
        // 判断是否有报错
        coun.then((value) => {
            result.total_rows = value;
        })
        coun.catch((error) => {
            throw createError(500, '服务器错误');
        })
        data.then((value) => {
            result.data = value;
        })  
        data.catch((error) => {
            throw createError(500, '服务器错误');
        })
        // 确保两个promise都执行完毕
        await Promise.all([coun, data]);
        res.json(result);

    } catch (error) {
        res.send({
            code: error.status || 500,
            message: error.message.toString()
        })
        // next(createError(error.status, error.message.toString()));
    }
});

/**
 * 根据提供的名称模糊查询预览的姓名
 */
router.post('/overtimeManagement/searchName/preview', async (req, res, next) => {
    try {
        if (!req.body) {
            throw createError(400, '请求体不能为空');
        }
        if (!req.body.name) {
            throw createError(400, 'name不能为空');
        }
        const sql = 'SELECT employee_name FROM overtime_records WHERE employee_name LIKE(?) LIMIT 10';
        const result = await new Promise((resolve, reject) => {
            pool.query(sql, [`${req.body.name}%`], (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
        
        let data = {
            code: 200,
            message: '查询成功',
            data: []
        };
        if (result.length === 0) {
            data.code = 400;
            data.message = '数据不存在';
            delete data.data;
            res.status(400);
            throw createError(400, '数据不存在');
        } else {
            data.data = result;
        }
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(error.status || 500).json({
            code: error.status || 500,
            message: error.message.toString()
        });
    }
});



// 错误处理中间件
router.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500);
    res.end({
        code: err.status || 500,
        message: err.message.toString()
    });
});

module.exports = router;
