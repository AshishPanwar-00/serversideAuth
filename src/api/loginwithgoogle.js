require("dotenv").config();
const express = require('express')
const passport = require('passport');
const session = require('express-session');
const Mongoose = require('mongoose');
const router = express.Router();
const MongoStore = require('connect-mongo')(session)
const { isAuth, isAdmin } = require('../middleware/isAuth');
const issuejwt = require('../utils/issueToken')
const User = require('../db/schema')

router.use(express.json())
router.use(express.urlencoded({ extended: false }));


// for storing session 
const sessionStore = new MongoStore({

    mongooseConnection: Mongoose.createConnection("mongodb://localhost:27017/graphql", {
        // newUrlParser: true,
        useUnifiedTopology: true,
    }),
    collection: "session"
})
router.use(session({
    secret: "ashishasini",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 24 * 3600
    }
}))



//middlewares
router.use(passport.initialize());
router.use(passport.session());
router.use((req, res, next) => {
    // console.log(req.session);
    // console.log(req.user);
    next();

});




// for local login
router.get('/login', passport.authenticate('local', {
    successRedirect: "/success",
    failureRedirect: "/error"
}))



//for google login
router.get('/login/google', passport.authenticate('google', {
    scope: ["profile", "email"],

}));
router.get('/api/v1/auth/google/callback', passport.authenticate("google", {
    failureMessage: "cannot login to google plaease try again later",
    failureRedirect: '/error',
    successRedirect: '/success'


}), (req, res) => {

    console.log("user:", req.user);
    res.send('thank you for sign in ')
}
);


// for jwt login
router.get('/jwt/login', async (req, res) => {

    var { username, password } = req.body;
    const matchedUser = await User.findOne({ username });
    if (!matchedUser) {
        res.send("user not found")

    }
    else {
        if (matchedUser.password == password) {
            const jwt = issuejwt(matchedUser);
            res.json({
                success: true,
                user: matchedUser,
                token: jwt.token
            })
        }
        else {
            res.send("wrong password")
        }

    }

})
// for regiseter

router.post("/users/register", async (req, res) => {


    try {
        const { username, password } = req.body;
        // console.log(req.body);
        const newUser = await User({ username, password })
        newUser.save();


        const jwt = issuejwt(newUser);

        res.json({
            success: true,
            user: newUser,
            expiresIn: jwt.expires,
            token: jwt.token
        })

    } catch (error) {
        res.send(error)

    }


})


// for logout 
router.get("/logout", (req, res) => {
    req.logout();
    res.send('logout sussfully');
});

// protencted routes
router.get("/checkjwt", passport.authenticate("jwt", { session: false, }), (req, res) => {
    res.send('Your are authorzed')
})
router.get('/success', isAdmin, (req, res) => {

    res.send('you are an admin')

});
router.get('/error', (req, res) => {
    res.send('login failed')
})



module.exports = router