const mongoose = require('mongoose');


const report_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    received_time: {
        type: Date,
        default: Date.now()
    }
});

const Report = new mongoose.model("Report", report_schema);

module.exports = Report;