const express = require('express')
const loginrouter = require("./api/loginwithgoogle")
require('../passport-setup')
require('./db/conn')
const path = require('path')
const app = express();





app.use(loginrouter);


// console.log(path.join(__dirname, "../../client/.next"));

app.set('view engine', "ejs");
app.get('/', (req, res) => {
    res.render('pages/index.ejs')
    // res.send("we are on server home page")


})

app.listen(8000, () => {
    console.log('listening to port 8000');
})