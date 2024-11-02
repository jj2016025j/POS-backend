const session = require("express-session");

module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET || "default_secret",
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }, // 若使用 HTTPS，可以設定為 true
        })
    );
};
