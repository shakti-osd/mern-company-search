const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

// Add/Save Service
exports.saveService = (req, res) => {
  const service = new db.services(req.body);

  service
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

// List Service List
exports.listService = (req, res) => {
  db.services
    .find({})
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

// Add/Save SubService
exports.saveSubService = (req, res) => {
  const subService = new db.subServices(req.body);

  subService
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

// List SubService
exports.listSubService = (req, res) => {
  let query = ''
  if(req?.query?.serviceId){
    query = {
      serviceId: new ObjectId(req?.query?.serviceId)
    }
  }else{
    query = 
    {
      subServiceName: {
      $regex: `^${req?.query?.search || ""}`,
      $options: "i",
    }
  }
  }
  db.subServices
    .find(query)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
