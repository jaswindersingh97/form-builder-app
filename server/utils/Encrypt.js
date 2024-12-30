const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY; // Secret Key stored in environment variables
const iv = crypto.randomBytes(16); // Initialization vector (IV)

function encryptData(userId, permission) {
    const data = JSON.stringify({ userId, permission });
    const key = Buffer.from(secretKey, 'hex'); // Ensure your secretKey is in hex format
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`; // Return IV with the encrypted data
}

module.exports = encryptData;
