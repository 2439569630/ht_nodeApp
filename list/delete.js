var express = require('express');
var router = express.Router();
const pool = require('../db/index')


router.use((req, res)=>{
    if (req.query.delete) {
        const sql = `
                        DELETE FROM staff WHERE id = ?
                    `;

        pool.query(sql, [req.query.delete], (error, results, fields) => {
            if (error) {
                res.status(500).send({
                    msg: '服务器错误',
                });
            } else {
                if (results.affectedRows) {
                    res.status(200)
                    res.send({
                        code: 200,
                        msg: '删除成功'
                    });
                }
                else{
                    res.status(500).send({
                        msg: '删除失败',
                    });
                }
                
            } 
        });
    }
    else{
        res.send    ({
            msg: '参数异常'
        })
    }
})


module.exports = router