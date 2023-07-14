const crypto = require('crypto')

/**
 * 
 * @param {string} privateKey 密钥
 * @param {string} encryptedData 密文
 */
module.exports = function (privateKey, encryptedData) {
    console.log(encryptedData);
    try {
        // 对数据进行解密
        const decryptedData = crypto.privateDecrypt({
            key: privateKey,
            passphrase: 'top secret',
            padding: crypto.constants.RSA_PKCS1_PADDING,
        }, Buffer.from(encryptedData, 'base64'));

        // 将解密后的数据转换为字符串并输出
        console.log(decryptedData.toString('utf8'))
        return decryptedData.toString('utf8')
    } catch (error) {
        // 捕获错误并在控制台中输出错误信息
        console.error(error)
    }
}
