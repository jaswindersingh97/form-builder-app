const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY;  // Secret Key stored in environment variables

function decryptData(encryptedData) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
}
module.exports = decryptData;