const router = require("express-promise-router")();
const passport = require("passport");
const useControllers = require("../controllers/authentication");
const { validateBody, schemas } = require("../helpers/routerHelpers");
const passportConf = require("../passport");

router
  .route("/signup")
  .post(validateBody(schemas.userSchema), useControllers.newUser);

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    useControllers.secrect
  );

module.exports = router;
