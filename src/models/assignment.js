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
    files: {
        type: Array,
        default: [],
    },
});

module.exports = { assignmentSchema };
