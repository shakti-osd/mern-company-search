const express = require('express');
const router = express.Router();


const serviceControllers = require("../controllers/services.controller");

router.get('/listServices', serviceControllers.listService);

router.post('/addService', serviceControllers.saveService);

router.get('/listSubServices', serviceControllers.listSubService);

router.post('/addSubService', serviceControllers.saveSubService);

module.exports = router;