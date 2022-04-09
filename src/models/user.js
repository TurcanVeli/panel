const mongoose = require("mongoose");
const { courseSchema } = require("../models/course");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    courses: [
        {
            type: courseSchema,
            default: [],
        },
    ],
});

const Student = mongoose.model("Student", userSchema);
const Instructor = mongoose.model("Instructor", userSchema);

module.exports = { Instructor, Student, userSchema };
