const { Strategy: JwtStrategy } = require("passport-jwt");

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: (request) => request.cookies.jwt,
    secretOrKey: "8e7rt9eyfsd789fgys89yg",
  },
  (payload, done) => {
    console.log(payload);

    // this is not finished
    // I should use the UserModel to see if this user exists
    done(null, payload.user);
  }
);

module.exports = { jwtStrategy };
