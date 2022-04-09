const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { assignmentSchema } = require("../models/assignment");

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    instructors: [
        {
            type: Schema.Types.ObjectId,
            ref: "Instructor",
        },
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    assignments: [
        {
            type: assignmentSchema,
            default: [],
        },
    ],
    files: {
        type: Array,
        default: [],
    },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course, courseSchema };
