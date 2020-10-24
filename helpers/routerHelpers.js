const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  validateBody: (schema) => {
    return async (req, res, next) => {
      // validate the body before creating user
      const result = schema.validate(req.body);
      if (result.error)
        return res.status(400).send(result.error.details[0].message);

      // check if the email already exists
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) return res.status(400).send("Email already exists");

      // hashing the password
      const salt = await bcrypt.genSaltSync(10);
      const hashedPass = await bcrypt.hashSync(req.body.password, salt);

      //   attaching the hashed pass to reqest body
      if (!req.body.hashedPass) {
        req.body.hashedPass = hashedPass;
      }

      // if all went well, now passing the program control to next middleware
      next();
    };
  },

  schemas: {
    userSchema: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  },
};
