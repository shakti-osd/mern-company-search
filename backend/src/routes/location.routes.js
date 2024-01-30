const express = require('express');
const router = express.Router();


const locationControllers = require("../controllers/location.controller");

router.get('/getCountry', locationControllers.listCountry);

router.post('/addCountry', locationControllers.saveCountry);

router.get('/getCity', locationControllers.listCity);

router.post('/addCity', locationControllers.saveCity);

module.exports = router;