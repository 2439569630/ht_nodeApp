/**
 * 用于生成密钥
 * @module sc
 * 
 */
const { generateKeyPair } = require('crypto');
const pool = require('./../db/index')
/**
 * 
 * @returns {generateKey} 生成密钥
 */
module.exports = async function generateKey() {
    try {
        // 创建一个Promise，用于生成RSA密钥对
        const key = await new Promise((resolve, reject) => {
            generateKeyPair('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },  
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                    cipher: 'aes-256-cbc',
                    passphrase: 'top secret'
                }
            }, (err, publicKey, privateKey) => {
                // 处理错误
                if (err) {
                    reject(err);
                    return;
                }
                // 解析 Promise
                resolve({
                    publicKey,
                    privateKey
                })  
            });
        });

        // 解构赋值，获取公钥和私钥
        const { publicKey, privateKey } = key;
        if (!publicKey) throw new Error('公钥生成失败');
        if (!privateKey) throw new Error('私钥生成失败');

        // 创建一个Promise，用于将公钥和私钥存储到数据库中
        await new Promise((resolve, reject) => {
            pool.query('UPDATE webrsa SET publicKey = ?, privateKey = ? WHERE id = 1', [publicKey, privateKey], (error, results, fields) => {
                if (error) reject(new Error('密钥保存到数据库失败。'));
                if (results.affectedRows) {
                    console.log({
                        '公钥：': '已生成\n',
                        '私钥：': '已生成\n',
                        '数据库：': '已保存'
                    });
                    resolve();
                } else {
                    reject(new Error('密钥保存到数据库失败，请确保webrsa表里已经有一条数据。id并且是1在重启！'));
                }
            });
        });
    } catch (error) {
        // 捕获错误
        console.log(error);
    }
}
