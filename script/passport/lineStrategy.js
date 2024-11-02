// config/passport/lineStrategy.js
const LineStrategy = require("passport-line");
const pool = require("../database/operations");

module.exports = new LineStrategy(
  {
    channelID: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    callbackURL: "http://localhost:8080/auth/line/redirect",
  },
  async (accessToken, refreshToken, profile, done) => {
    const id = profile.id;
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE lineID = ?",
      [id]
    );
    if (existingUser) {
      done(null, existingUser);
    } else {
      await pool.query(
        "INSERT INTO users (name,lineID,thumbnail) VALUES(?,?,?)",
        [profile.displayName, profile.id, profile.pictureUrl]
      );
      const [newUser] = await pool.query(
        "SELECT * FROM users WHERE lineID = ?",
        [id]
      );
      done(null, newUser);
    }
  }
);
