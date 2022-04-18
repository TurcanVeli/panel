const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            default: [],
        },
    ],
});

const Student = mongoose.model("Student", userSchema);
const Instructor = mongoose.model("Instructor", userSchema);

module.exports = { Instructor, Student, userSchema };
