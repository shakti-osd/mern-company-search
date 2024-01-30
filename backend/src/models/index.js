const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.profile = require("./profile.model.js");
db.user = require("./user.model");
db.services = require("./services.model");
db.subServices = require("./subServices.model");
db.locationCountries = require("./locationCountry.model");
db.locationCities = require("./locationCity.model");
db.feedback = require("./feedback.model");
db.contactUs = require("./contactUs.model");

module.exports = db;
