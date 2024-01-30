const nodemailer = require("nodemailer");
const db = require("../models");

const sendEmail = async (
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
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: "587",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectAuthorized: false },
  });

  const htmlMessage = `<div>
  <div style="min-height: 40px;
        color: #ffffff;
        background: linear-gradient(to right,#3fa36c,#9cf8fa);
        font-size: 1.3rem;
        display: flex;
        padding: 12px 18px;
        align-items: center;
        border: solid 1px #00000"
  >
    <div>Message from ${name} - ${reply_to} <div style="font-size:1rem;">Phone Number: <a href="tel:${phone}">${phone}</a></div></div>
  </div>
  <div style="border: solid 1px #cccccc;
        font-size:1.1rem;
        padding: 12px 18px;
        ">${message}</div>
  </div>`;

  const options = {
    from: sent_from,
    to: "sandeepk@dewsolutions.in",
    replyTo: reply_to,
    subject: subject,
    html: htmlMessage,
  };

  const contact = new db.contactUs({
    userName: name,
    email: reply_to,
    phone: phone,
    service: service,
    message: message,
    user: userId,
    company: companyId,
  });

  contact
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log("sendmail error: ", err);
    } else {
      console.log("sendmail info: ", info);
    }
  });
};
module.exports = sendEmail;
