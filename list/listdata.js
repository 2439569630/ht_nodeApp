
var express = require('express');
var router = express.Router();
const pool = require('../db/index')


function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

router.use((req, res) => {
    // console.log(req.query);

    if (req.query) {
        const sql = `
        SELECT s.id, s.name, s.sex, s.birthday, s.other, s.seid, p.name AS post_name, S.poid
        FROM staff s
        JOIN post p ON s.poid = p.id
        WHERE s.seid = ?
        ORDER BY s.id DESC;
                    `;

        pool.query(sql, [req.query.id], (error, results, fields) => {
            if (error) {
                res.status(500).send({
                    msg: '服务器错误',
                });
            } else {
                const dataWithAge = results.map((row) => {
                    const age = calculateAge(row.birthday);
                    return { ...row, age };
                });
                res.send(dataWithAge);
            }
        });
    }
});









module.exports = router