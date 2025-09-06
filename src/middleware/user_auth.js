const jwt = require("jsonwebtoken");
const User = require("../models/sign_up");

const user_auth = async (req, res, next) => {

    try {

        const token = req.cookies.Career_Guidance;
        const verify = jwt.verify(token, process.env.SECRET_PROJECT);

        const user_auth_id = await User.findOne({ _id: verify._id, email: verify.email });

        if (user_auth_id.status === "blocked") {
            res.clearCookie("Career_Guidance");
            res.render("user_sign_in", { err: "a", action: "Contact", title: "Account Blocked", text: "Admin has <b>Blocked</b> your acoount for your respective <b>actions</b><br><br> Contact Us to get your <b>account</b> back" })
        }

        req.token = token;
        req.user_auth_id = user_auth_id;

        next();


    } catch (error) {
        res.render("b_index");
    }

}

module.exports = user_auth;