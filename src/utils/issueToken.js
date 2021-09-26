const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs');

const PRIV_Key = fs.readFileSync(__dirname + "../../../crypto/id_rsa_priv.pem", "utf-8")


function issueJWT(user) {
    const _id = user._id;
    const expirsIn = '1d';
    const payload = {
        sub: _id,
        iat: Date.now(),
    }
    const signedToken = jsonwebtoken.sign(payload, PRIV_Key, { expiresIn: expirsIn, algorithm: "RS256" });

    return {
        token: "Bearer " + signedToken,
        expires: expirsIn
    }
}


module.exports = issueJWT;