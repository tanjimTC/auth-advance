const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
