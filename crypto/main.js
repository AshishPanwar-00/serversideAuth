const fs = require('fs')
const encrypt = require('./encrypr');
const decrypt = require('./decrypt')



const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", 'utf-8')

const encryptedmessage = encrypt.encryptWithPublicKey(publicKey, " some super secret message")


console.log(encryptedmessage.toString());

const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf-8")

const decryptedmessage = decrypt.decryptWithPrivateKey(privateKey, encryptedmessage)

console.log(decryptedmessage.toString());