const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

// This file is used only while inserting data into mongo or database

const user_schema = mongoose.Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    c_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    last_seen: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "waiting"
    },
    reviews: {
        type: Number,
        default: 5
    },
    rating1: {
        type: String,
        default: ""
    },
    rating2: {
        type: String,
        default: ""
    },
    rating3: {
        type: String,
        default: ""
    },
    rating4: {
        type: String,
        default: ""
    },
    rating5: {
        type: String,
        default: ""
    }
})


user_schema.methods.generateAuthToken = async function () {
    try {
        
        const token = jwt.sign({_id : this._id , email : this.email , status : this.status},process.env.SECRET_PROJECT)
        return token;
        
    } catch (error) {
        console.log(error)
    }
}


// creation of collection

const User = new mongoose.model("User", user_schema);

module.exports = User;