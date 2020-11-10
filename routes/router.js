const router = require("express-promise-router")();
const passport = require("passport");
const useControllers = require("../controllers/authentication");
const {
  validateBody,
  validateUserLogin,
  schemas,
} = require("../helpers/routerHelpers");
const passportConf = require("../passport");

const requireSignIn = passport.authenticate("local", { session: false });
const requireauth = passport.authenticate("jwt", { session: false });

router
  .route("/signup")
  .post(validateBody(schemas.userSchema), useControllers.newUser);

router
  .route("/secret")
  .get(requireauth, useControllers.secrect)
  .post(
    validateUserLogin(schemas.userSchema),
    requireSignIn,
    useControllers.protected
  );

module.exports = router;
