const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY; // Secret Key stored in environment variables

function decryptData(encryptedData) {
    const [ivHex, encrypted] = encryptedData.split(':'); // Split IV and encrypted data
    const iv = Buffer.from(ivHex, 'hex');
    const key = Buffer.from(secretKey, 'hex'); // Ensure your secretKey is in hex format

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
}

module.exports = decryptData;
