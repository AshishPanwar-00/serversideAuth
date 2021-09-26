const crypto = require('crypto');
const fs = require('fs')

function getKeypair() {
    const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096, //bits standard for rsa keys
        publicKeyEncoding: {
            type: "pkcs1", //public key cryptography standard 1
            format: "pem" //most common formatting choice

        },
        privateKeyEncoding: {
            type: "pkcs1", //private key cryptography standard 1
            format: "pem"
        }
    });
    fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey)
    fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey)

};


getKeypair();
