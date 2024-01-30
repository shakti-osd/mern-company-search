const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  user: {
    type: Object,
    ref: "users",
  },
  company: {
    type: Object,
    ref: "profiles",
  },
  dateTime: {
    type: Date,
    trim: true,
    require: true,
  },
  rating: {
    type: Number,
    trim: true,
    require: true,
  },
  comment: {
    type: String,
    trim: true,
    require: true,
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
