const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const profileSchema = new mongoose.Schema({
  companyName: {
    type: String,
    require: true,
    trim: true,
  },
  city: {
    type: Object,
    ref: "locationCities",
  },
  country: {
    type: Object,
    ref: "locationCountries",
  },
  subService: {
    type: Array,
    ref: "subservices",
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  companyWebsite: {
    type: String,
    require: true,
    trim: true,
    uniqe: true,
  },
  client: {
    type: String,
    require: true,
    trim: true,
  },
  clientComment: {
    type: String,
    require: true,
    trim: true,
  },
  totalEmployees: {
    type: String,
    require: true,
    trim: true,
  },
  foundingYear: {
    type: Number,
    require: true,
    trim: true,
  },
  phone: {
    type: String,
    require: true,
    trim: true,
  },
  rating: {
    type: Number,
    require: true,
    trim: true,
  },
  reviews: {
    type: Number,
    require: true,
    trim: true,
  },
  tagline: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  companyLogo: {
    type: String,
    require: true,
    trim: true,
  },
  saleEmail: {
    type: String,
    require: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  isPremium: {
    type: Boolean,
    require: true,
  },
  userId:{
    type:ObjectId,
    ref:"Users"
}
});

module.exports = mongoose.model("profiles", profileSchema);
