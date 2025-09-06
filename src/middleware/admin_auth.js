const jwt = require("jsonwebtoken");

const admin_auth = async (req, res, next) => {

    try {

        const token = req.cookies.a_admin_token;
        const a_verify = jwt.verify(token, process.env.SECRET_PROJECT);
        next();

    } catch (error) {
        res.render("b_index");
    }

}

module.exports = admin_auth;