const jsonwebtoken = require("jsonwebtoken");

// creates a unique JWT (javascript web token)
function issueJwt(userId) {
  // sub = subscriber
  // iat = issued at

  const payload = {
    user: userId, // this is how we identify the user
  };

  const secret = "8e7rt9eyfsd789fgys89yg";

  return jsonwebtoken.sign(payload, secret, {
    expiresIn: "1d", // expires in 1 day
  });
}

module.exports = { issueJwt };
