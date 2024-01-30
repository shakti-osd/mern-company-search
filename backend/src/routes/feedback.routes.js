const express = require("express");
const router = express.Router();

const feedbackControllers = require("../controllers/feedback.controller");

router.get("/", feedbackControllers.list);

router.post("/", feedbackControllers.save);

module.exports = router;
