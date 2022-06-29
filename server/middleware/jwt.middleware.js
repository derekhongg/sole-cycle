// Route -> Middlware -> Controller
const jwt = require("jsonwebtoken");

const authenticateJwt = async(req, res, next) =>{  
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            res.locals.payload = payload;
            next();
        }
    });
}

module.exports = {
    authenticateJwt
};