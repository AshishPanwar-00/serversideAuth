const monoogse = require('mongoose');


async function connectDB() {
    const db = await monoogse.connect('mongodb://localhost:27017/graphql', {

    })
    console.log("connection successfully");

}

connectDB();