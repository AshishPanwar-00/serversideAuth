const crypto = require('crypto')


function decryptWithPrivateKey(privateKey, encryptedmessage) {
    return crypto.privateDecrypt(privateKey, encryptedmessage)

}


module.exports.decryptWithPrivateKey = decryptWithPrivateKey;