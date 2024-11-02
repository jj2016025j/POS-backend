// config/passport/googleStrategy.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../database/operations/userOperations");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/redirect",
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser) {
      done(null, existingUser);
    } else {
      await pool.query(
        "INSERT INTO users (name,googleID,thumbnail,email) VALUES(?,?,?,?)",
        [profile.displayName, profile.id, profile.photos[0].value, email]
      );
      const [newUser] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      done(null, newUser);
    }
  }
);
