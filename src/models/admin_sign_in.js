const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

// This file is used only while inserting data into mongo or database

const admin_schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secret_code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

admin_schema.methods.generateAuthToken = async function () {
    try {
        
        const token = jwt.sign({email : this.email , name : this.name, designa:this.designation , img : this.image },process.env.SECRET_PROJECT)
        return token;
        
    } catch (error) {
        console.log(error)
    }
}


// creation of collection

const Admin = mongoose.model("Admin", admin_schema, "admin");

module.exports = Admin;