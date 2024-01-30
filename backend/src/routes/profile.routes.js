const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile.controller");
router.get("/", profileController.list);
router.post("/profileCreate", profileController.save);
router.post('/getProfileById', profileController.show);
router.patch('/profileUpdate', profileController.update);
router.post('/checkEmail', profileController.checkEmail);
module.exports = router;
