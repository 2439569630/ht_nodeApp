/**
 * 这个模块提供了两个方法，读取公钥私钥。
 * @module readRSA
 * 
 */
const pool = require('./../db/index')
module.exports = {
    Public_key,
    Private_key
}


/**
 * 从数据库读取公钥
 * @returns {string} Public_key 返回公钥
 */
function Public_key() {
    return new Promise((resolve, reject) => {
        pool.query(`
        select publickey 
        from webrsa
        where id = 1
        `,(error, results, fields) => {
            // console.log(results); // 添加此行来查看查询结果
            if (error) {reject('从数据库读取公钥失败。')}
            if (results.length) {
                resolve(results[0].publickey)
            } else {
                reject(new Error('从数据库读取公钥失败，请确保webrsa表里已经有一条数据。id并且是1在重启！'));
            }
        })
    })
}
/**
 * 从数据库读取私钥
 * @returns {string} Private_key 返回私钥
 */
function Private_key() {
    return new Promise((resolve, reject) => {
        pool.query(`
        select privatekey 
        from webrsa
        where id = 1
        `,(error, results, fields) => {
            if (error) {reject('从数据库读取私钥失败。')}
            if (results.length) {
                resolve(results[0].privatekey);
            } else {
                reject(new Error('从数据库读取私钥失败，请确保webrsa表里已经有一条数据。id并且是1在重启！'));
            }
        })
    })
}