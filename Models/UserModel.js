const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  hash: String,
  attendence: { type: [{}], validator: () => {} },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
