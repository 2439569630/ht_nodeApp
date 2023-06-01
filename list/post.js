var express = require('express');
var router = express.Router();
const pool = require('../db/index')





router.use((req, res)=>{
    const sql = `SELECT * FROM post`
    pool.query(sql, (error, results, fields) => {
        if (error) {
            res.status(500).send({
                msg: '服务器错误',
            });
        } else {
            // 修改一下对象的属性名
            let obj = []
            results.forEach(element => {    
                obj.push({
                    value: element.id,
                    label: element.name
                })
            });
            
            res.send(obj)
        } 
    });
})




module.exports = router