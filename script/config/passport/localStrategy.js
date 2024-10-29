// config/passport/localStrategy.js
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const pool = require("../database");

module.exports = new LocalStrategy(async (username, password, done) => {
  const [foundUser] = await pool.query("SELECT * FROM users WHERE email = ?", [
    username,
  ]);
  if (foundUser) {
    const result = await bcrypt.compare(password, foundUser.password);
    if (result) {
      done(null, foundUser);
    } else {
      done(null, false);
    }
  } else {
    done(null, false);
  }
});
