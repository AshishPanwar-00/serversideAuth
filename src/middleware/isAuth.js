const isAuth = (req, res, next) => {

    if (req.isAuthenticated()) {
        next();

    }
    else {
        res.status(401).json('you are not authorized to view this page')

    }

}
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        next();

    }
    else {
        res.status(401).json('you are not authorized to view this page')

    }


}
module.exports = { isAuth, isAdmin }
