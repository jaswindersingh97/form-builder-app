const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY;  // Secret Key stored in environment variables

function encryptData(userId, permission) {
    const data = JSON.stringify({ userId, permission });
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
module.exports = encryptData;