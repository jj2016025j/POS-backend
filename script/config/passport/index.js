// config/passport/index.js
const passport = require("passport");
const googleStrategy = require("./googleStrategy");
const localStrategy = require("./localStrategy");
const lineStrategy = require("./lineStrategy");
const pool = require("../database");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [foundUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, foundUser);
});

// 使用各策略
passport.use(googleStrategy);
passport.use(localStrategy);
passport.use(lineStrategy);

module.exports = passport;
