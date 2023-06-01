var express = require('express');
var router = express.Router();
const pool = require('../db/index')

const tip = {
    name: '姓名',
    sex: '性别',
    birthday: '出生时间',
    poid: '岗位',
    seid: '部门id'
}
const aryy = ['name', 'sex', 'birthday', 'poid', 'seid']



router.use((req, res, next) => {
    console.log(req.query);
    let error = false;
    for (let i = 0; i < aryy.length; i++) {
        let element = aryy[i];
        if (req.query[element] && req.query[element] !== '') {
            console.log(element + ":存在");
        }
        else {
            res.send({
                code: 400,
                msg: tip[element] + '不存在'
            })
            error = true;
            console.log(element + ":不存在")
            break;
        }
    }
    if (!error) {
        next();
    }
});



router.use((req, res) => {
    let data = []
    let { name, sex, birthday, textarea, poid, seid } = req.query
    if (req.query['textarea'] && req.query['textarea'] !== '') {
        data = [name, sex, birthday, textarea, poid, seid]
    } else {
        console.log(23333333333333333333);  
        textarea = null
        data = [name, sex, birthday,textarea, poid, seid]
    }
    const sql = `
                    INSERT INTO staff (name, sex, birthday, other, poid, seid)
                    VALUES (?, ?, ?, ?, ?, ?);  
                `
    console.log(data);
    pool.query(sql, data,
        (error, results, fields) => {
            if (error) {
                res.status(500).send({
                    msg: '服务器错误'
                });
            } else {
                if (results['affectedRows'] > 0) {
                    res.status(200)
                    res.send({
                        code: 200,
                        msg: '添加成功',
                        insertId: results['insertId']
                    })
                }
                else {
                    res.status(400)
                    res.send({
                        code: 400,
                        msg: '添加失败',
                    })
                }
            }
        });
})










module.exports = router