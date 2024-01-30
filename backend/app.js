const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || process.env.NODE_APP_PORT || 5555;
require("dotenv").config({
  path: "./environments/.env." + process.env.NODE_ENV,
});
const { MONGO_URI } = require("./src/config/db.config");
const REACT_APP_PATH = process.env.REACT_BASE_PATH;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

mongoose.connection.on("error", () => {
  console.log("Error in DB connection");
});

const session = require("express-session");
const passport = require("passport");

//Middleware
app.use(
  session({
    secret: process.env.GOOGLE_APP_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// init passport on every route call, allow passport to use "express-session"
app.use(passport.initialize());
app.use(passport.session());
require("./src/auth/authGoogle");

app.use(
  cors({
    origin: REACT_APP_PATH,
    methods: "GET,POST,PATCH,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("./src/routes")(app);

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: REACT_APP_PATH,
    failureRedirect: "/user/login/failuare",
  })
);

app.listen(PORT, () => {
  console.log("Connected to port: ", PORT);
});
