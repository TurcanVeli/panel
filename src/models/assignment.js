const mongoose = require("mongoose");

const Assignment = new mongoose.Schema({
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
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  files: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Assignment", Assignment);
