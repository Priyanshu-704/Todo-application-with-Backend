const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
   dueDate: {
    type: Date, // 📅 due date field
  },
   isCompleted: {
    type: Boolean,
    default: false,
  },
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
}, {timestamps: true});

const list = mongoose.model("list", listSchema);
module.exports = list;
