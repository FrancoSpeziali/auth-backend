const express = require("express");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { jwtStrategy } = require("./config/passportJwt");
const cors = require("cors");

const app = express();

// 80 - http
// 443 - https
// 3000 - create react app

mongoose
  .connect(
    `mongodb+srv://dci-franco:v1IWgZm4br6Rh8YE@cluster0.fczes.mongodb.net/auth?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connection established to database!!!!!");
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); // parsing any JSON objects from the request - request.body
app.use(cookieParser());
app.use(passport.initialize());

passport.use(jwtStrategy);

// middleware
app.use("/user", userRoutes);

app.listen(3002, () => {
  console.log("application is running!");
});
