const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
    },
    postDate: {
        type: Date,
        default: Date.now,
    },
    files: {
        type: Array,
        default: [],
    },
});

module.exports = { announcementSchema };
