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
  schoolId: {
    type: String,
    required: isInstructor ? false : true,
    default: "",
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

export const User = mongoose.model("User", userSchema);
