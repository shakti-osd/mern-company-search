const db = require("../models");

exports.saveCountry = (req, res) => {
  console.log(req.body);
  const locationCountries = new db.locationCountries(req.body);

  locationCountries
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.listCity = (req, res) => {
  db.locationCities
    .find({
      cityName: { $regex: `^${req?.query?.search || ""}`, $options: "i" },
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.saveCity = (req, res) => {
  console.log(req.body);
  const locationCities = new db.locationCities(req.body);

  locationCities
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.listCountry = (req, res) => {
  db.locationCountries
    .find({})
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
