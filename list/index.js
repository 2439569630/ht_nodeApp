var express = require('express');
var router = express.Router();
const pool = require('../db/index')

router.use((req, res) => {
    const sql = `SELECT body.id AS body_id, body.name AS body_name, section.id AS section_id, section.name AS section_name
    FROM body
    JOIN section
    ON body.id = section.super
    `
    pool.query(sql, (error, results, fields) => {
        if (error) {
            res.status(500).send({
                msg: '服务器错误',
            })
        }
        else {
            const data = []; // 用于存储处理后的数据

            results.forEach(row => {
                let body = data.find(item => item.id === row.body_id);
                if (!body) {
                    body = {
                        id: row.body_id,
                        name: row.body_name,
                        super: 0,
                        sub: []
                    };
                    data.push(body);
                }
                body.sub.push({
                    id: row.section_id,
                    name: row.section_name,
                    super: 0
                });
            });
            res.send(data)
            // console.log(data);
        }
    });
})










module.exports = router