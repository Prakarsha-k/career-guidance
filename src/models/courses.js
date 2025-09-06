const mongoose = require('mongoose');

const course_schema = mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    sub_course: {
        type: String,
        required: true
    },
    college_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    links: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default : 0
    }
})

const Course = mongoose.model("Course", course_schema, "course")

module.exports = Course;