const crypto = require('crypto')
const hash = crypto.createHash("sha256")
const fs = require('fs')
const encrypt = require('./encrypr')
const decrypt = require('./decrypt');

const myData = {
    firstname: "ashish",
    lastName: "saini",
    socialSecurityNumber: "never put personal info data"
};

const myDataString = JSON.stringify(myData)
hash.update(myDataString);

const hashedData = hash.digest('hex');
