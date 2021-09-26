const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {

        userId: String,
        name: String,
        fullname: String,
        fname: String,
        roll: Number,
        class: Number,
        address: String,
        email: String,
        verified: Boolean,
        accestoken: String,
        token: String,
        googleId: String,
        picture: String,
        password: String,
        username: String,
        isAdmin: {
            type: Boolean,
            default: false,
        }
    }
)

const User = mongoose.model('user', schema);


module.exports = User