const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    dueDate: {
        type: Date,
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    files: {
        type: Array,
        default: [],
    },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = { Assignment, assignmentSchema };
