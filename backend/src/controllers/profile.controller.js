const db = require('../models');

exports.save = (req, res) => {
  const profile = new db.profile(req.body);

  profile
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.list = (req, res) => {
  db.profile
    .find({
      $and: [
        {
          'subService.subServiceName': {
            $in: [req?.query?.service.split('_').join(' ')],
          },
        },
        { 'city.cityName': req?.query?.location.split('_').join(' ') },
      ],
    })
    .limit(req?.query?.count)
    .skip(req?.query?.skip)
    .sort({ isPremium: -1 })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.show = (req, res) => {
  let query
  if(req.body.userId !== undefined){
    query = { userId : req.body.userId}
  }else{
    query = { _id: req.body.profileId }
  }

  db.profile
  .find(query)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};

exports.update = (req, res) => {
  db.profile
    .find({ userId: req.body.userId })
    .then((user) => {
      if (user.length > 0) {
        const updateQuery = {
          companyName: req.body.companyName,
          city: req.body.city,
          address: req.body.address,
          subService: req.body.subService,
          companyWebsite: req.body.companyWebsite,
          totalEmployees: req.body.totalEmployees,
          foundingYear: req.body.foundingYear,
          phone: req.body.phone,
          tagline: req.body.tagline,
          description: req.body.description,
          companyLogo: req.body.companyLogo,
        };
        db.profile
          .updateOne(
            { userId: req.body.userId },
            { $set: updateQuery },
            { upsert: true }
          )
          .then((response) => {
            res.status(200).json(response);
          })
          .catch((err) => console.log(err));
      } else {
        res.status(400).json({ message: 'Invalid User' });
      }
    })
    .catch((err) => console.log(err));
};

exports.checkEmail = (req, res) => {
  db.profile
    .find({ saleEmail: req.body.saleEmail })
    .then((user) => {
      if (user.length > 0) {
        res.status(203).json({ message: 'Email already exists' });
      } else {
        res.status(200).json({ message: 'Email available' });
      }
    })
    .catch((err) => console.log(err));
};
