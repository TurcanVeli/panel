const mongoose = require("mongoose");
const { submissionSchema } = require("./submission");
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
    maxPoints: {
        type: Number,
        default: 100,
    },
    submissions: [
        {
            type: submissionSchema,
        },
    ],
});

module.exports = { assignmentSchema };
