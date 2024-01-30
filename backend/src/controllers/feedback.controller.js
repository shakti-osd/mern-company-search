const db = require("../models");

exports.save = (req, res) => {
  const { user, rating, comment, dateTime } = req.body;
  const requiredField = !user
    ? "User"
    : !rating
    ? "Rating"
    : !comment
    ? "Comment"
    : !dateTime
    ? "Date"
    : !company
    ? "Company"
    : "";
  if (requiredField) {
    return res.status(422).json({ error: `${requiredField} is required` });
  }

  const feedback = new db.feedback(req.body);

  feedback
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.list = (req, res) => {
  db.feedback
    .find({})
    .populate("user company")
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
