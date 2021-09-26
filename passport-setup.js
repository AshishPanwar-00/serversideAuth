const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./src/db/schema');
require("dotenv").config();
const fs = require('fs')
const LocalStrategy = require('passport-local');
const PUB_KEY = fs.readFileSync(__dirname + "/crypto/pubkey.pem", "utf-8");
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


//jwt stratgy
// all option are here

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithm: ["RS256"],


}

const jwtstatgy = new jwtStrategy(options, async (payload, done) => {
    try {
        const matchedUser = await User.findOne({ _id: payload.sub })
        if (!matchedUser) {
            done(null, false, { message: "user not found" })
        }
        else {
            done(null, matchedUser)
        }
    } catch (error) {
        done(error, null)

    }

});

passport.use(jwtstatgy);



//local strategy
passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {

            const matchedUser = await User.findOne({ username: username });
            if (!matchedUser) {
                return done(null, false, { message: "user not found" })
            }
            else {
                console.log(matchedUser.password, password)
                if (matchedUser.password != password) {
                    return done(null, false, { message: "incorrect password" })

                }
                else {
                    return done(null, matchedUser)
                }
            }

        } catch (error) {
            return done(error)

        }

    }
));




//google strategy
const callbackUrl = "http://localhost:8000/api/v1/auth/google/callback"
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackUrl,
    passReqToCallback: true,

}, async (req, accesToken, refreshToken, profile, done) => {
    const defaultUser = {
        fullname: profile.name.givenName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id

    }

    const user = await User.find({ googleId: defaultUser.googleId })
        .catch((err) => {
            console.log("error signing in ", err);
            return done(err, null)
        });

    if (user && user[0]) {
        return done(null, user && user[0])
    }
    else {
        const newuser = await User(defaultUser)
        newuser.save();
        return done(null, newuser)
    }

}
));


passport.serializeUser((user, cb) => {

    cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
    const user = await User.findOne({ id }).catch((err) => {
        console.log("error desirilizing");
        cb(err, null)
    })
    if (user) {
        cb(null, user)
    }

})



{// const opt = {
    //     jwtFromRequest: ExtractJwt.fromAuthHeadersAsToken(),
    //     secretOrKey: PUB_KEY,
    //     issuer: "ashish panwar",
    //     audience: "enter audience name",
    //     algorithm: ["RS256"],
    //     ignoreExpiration: false,
    //     passReqToCallback: false,
    //     jsonWebTokenOptions: {
    //         complete: false,
    //         clockTolerence: "",
    //         maxAge: "2d",
    //         clockTimeStamp: '100',
    //         nonce: "string here for openID"
    //     }

    // }
}