const passport = require("passport");
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(null, false);
      }
    }
  )
);
