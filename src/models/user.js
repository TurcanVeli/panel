const mongoose = require("mongoose");

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
    password: {
        type: String,
        required: true,
    },
    isInstructor: {
        type: Boolean,
        default: false,
    },
    courses: {
        type: Array,
        default: [],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
