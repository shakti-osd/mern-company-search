const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
require("../models/user.model");
const users = mongoose.model("users");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.NODE_APP_SECRET || "TechMate-App-Secret";

const GoogleStrategy = require("passport-google-oauth2").Strategy;

const authUser = async (request, accessToken, refreshToken, profile, done) => {
  try {
    const result = await users.findOne({ email: profile.email });

    if (result) {
      profile.userId = result._id;
    }
    return done(null, profile);
  } catch (err) {
    return done(err, null);
  }
};

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.NODE_BASE_PATH}/auth/google/callback`,
      passReqToCallback: true,
    },
    authUser
  )
);

passport.serializeUser(async (user, done) => {
  try {
    const currentDate = new Date();
    const filter = { email: user.email };
    const insertData = {
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      profile_pic: user.picture,
      is_verified: user.verified,
      updated_on: currentDate,
    };

    const existingUser = await users.findOne(filter);
    if (!existingUser) {
      const newUser = new users(insertData);
      const result = await newUser.save();
      user.userId = result._id;
    } else {
      user.userId = existingUser._id;
    }

    console.log(`\n--------> Serialize User:`);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.deserializeUser((user, done) => {
  console.log("\n--------- Deserialized User:");
  // console.log(user)
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});
