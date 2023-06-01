var express = require('express');
var router = express.Router();
const pool = require('../db/index')





router.use((req, res, next) => {
    const data_Object = ['id','name', 'region', 'birthday', 'post_name', 'textarea']
    const result = data_Object.every(key => key in req.query);
    if (result) {
        next()
    }
    else{
        res.status(401)
        res.send({
            code: 401,
            msg: '数据缺失'
        })
    }
}) 

router.use((req, res) => {
    const date = new Date(req.query['birthday']);
    const formattedDate = date.toISOString().split('T')[0];
    const sql = `
                UPDATE staff
                SET name = ?,
                    sex = ?,
                    birthday = ?,
                    poid = ?,
                    other = ?
                WHERE id = ?;
            `
    pool.query(sql, [req.query['name'],req.query['region'],formattedDate,req.query['post_name'],req.query['textarea'],req.query['id']],
    (error, results, fields) => {
        if (error) {
            res.status(500).send({
                msg: '服务器错误'
            });
        } else {
            if (results.affectedRows > 0) {
                res.status(200)
                res.send({
                    code: 200,
                    msg: '修改成功',
                    affectedRows: results.affectedRows
                })
            }
        } 
    });
})














module.exports = router