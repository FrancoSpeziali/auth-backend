const { Strategy: JwtStrategy } = require("passport-jwt");
ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
