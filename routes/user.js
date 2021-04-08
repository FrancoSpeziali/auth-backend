// collection of endpoints related to the user

const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/UserModel");
const passport = require("passport");
const { issueJwt } = require("../utils/jwtIssuer");

const router = express.Router();

// 1. register

router.post("/register", async (request, response) => {
  const { email, password } = request.body;

  try {
    if (!email || !password) {
      throw "Credentials not supplied";
    }

    const hasUserRegistered = await UserModel.findOne({ email }); // return an object or null

    // any variable with a "truthy" value will fulfill a truth condition

    if (hasUserRegistered) {
      throw "User has already registered";
    }

    // created a unique salt + created the hash
    const hash = await bcrypt.hash(password, 10);

    await UserModel.create({
      email,
      hash,
    });

    response.send("user created");
  } catch (error) {
    response.status(500).send(error);
  }

  // check if user has registered before
  // add that user to the database
});

// 2. login

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    if (!email || !password) {
      throw "Credentials not supplied";
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw "User not found";
    }

    const match = await bcrypt.compare(password, user.hash); // boolean

    if (!match) {
      throw "password does not match";
    }

    const token = issueJwt(user._id);

    response
      .cookie("jwt", token, {
        httpOnly: true, // controlled by backend - security
        secure: false, // http not https
        sameSite: "lax", // running on different domains between backend / frontend
      })
      .send("user logged in");
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get(
  "/details",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    response.send({ user: request.user });
  }
);

module.exports = router;
