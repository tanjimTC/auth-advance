const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  newUser: async (req, res, next) => {
    const newUser = await new User({
      email: req.body.email,
      password: req.body.hashedPass,
    });
    const user = await newUser.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
    res.status(200).send(token);
  },
  secrect: async (req, res, next) => {
    console.log("i managed to get in");
    res.status(200).json({ sucess: "success" });
  },
  protected: async (req, res, next) => {
    console.log("i managed to get in protected");
    res.status(200).send({ token: req.user });
  },
};
