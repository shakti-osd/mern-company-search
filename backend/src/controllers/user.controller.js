const db = require("../models");

exports.save = (req, res) => {
  const { firstName, lastName, address, phone, email, company } = req.body;
  const requiredField = !firstName
    ? "First Name"
    : !lastName
    ? "Last Name"
    : !email
    ? "Email"
    : !phone
    ? "Phone"
    : !company
    ? "Company"
    : !address
    ? "Address"
    : "";
  if (requiredField) {
    return res.status(422).json({ error: `${requiredField} is required` });
  }

  const user = new db.user(req.body);

  user
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.list = (req, res) => {
  db.user
    .find({})
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
