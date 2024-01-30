const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const contactUsSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
  phone: {
    type: String,
    trim: true,
    require: true,
  },
  service: {
    type: String,
    trim: true,
    require: true,
  },
  message: {
    type: String,
    trim: true,
    require: true,
  },
  company: {
    type: ObjectId,
    ref: "profiles",
  },
  user: {
    type: ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("contactus", contactUsSchema);
