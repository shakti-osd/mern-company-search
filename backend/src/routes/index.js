const user = require("./user.routes");
const profiles = require("./profile.routes");
const services = require("./services.routes");
const location = require("./location.routes");
const feedback = require("./feedback.routes");

module.exports = (app) => {
  app.use("/user", user);
  app.use("/profile", profiles);
  app.use("/service", services);
  app.use("/location", location);
  app.use("/feedback", feedback);
};
