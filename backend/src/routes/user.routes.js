const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");
const sendEmail = require("../utils/sendEmail");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});
router.get("/login/failuare", (req, res) => {
  res.status(403).json({ error: true, message: "Not Authorized" });
});

router.get("/logout", function (req, res, next) {
  // res.clearCookie("connect.sid");
  req.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      res.redirect(process.env.REACT_BASE_PATH);
      // res.status(200).json({ error: false, message: "Logout" });
      // res.sendStatus(200);
    }
  });
});

router.get("/", userControllers.list);
router.post("/registration", userControllers.save);

router.post("/sendemail", async (req, res) => {
  const {
    send_to,
    service,
    message,
    reply_to,
    name,
    phone,
    userId,
    companyId,
  } = req.body;

  try {
    const sent_from = process.env.EMAIL_USER;
    const subject = `Enquiry for ${service}`;
    await sendEmail(
      subject,
      message,
      send_to,
      sent_from,
      reply_to,
      name,
      phone,
      userId,
      companyId,
      service
    );
    res.status(200).json({ success: true, message: "Email Sent Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
