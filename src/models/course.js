const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
    },
    students: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
    },
    assignments: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        default: [],
    },
    files: {
        type: Array,
        default: [],
    },
});

const Course = mongoose.model("Course", courseSchema);

exports.Course = Course; 
