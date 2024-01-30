const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  company: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  // phone: {
  //   type: Number,
  //   require: true,
  //   trim: true,
  //   unique: true,
  // },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  profile_pic: {
    type: String,
    trim: true,
  },
  is_verified: {
    type: Boolean,
    require: true,
  },
  updated_on: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("users", userSchema);
