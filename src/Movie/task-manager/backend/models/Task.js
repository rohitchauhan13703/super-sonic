const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
