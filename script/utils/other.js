
require("./script/passport");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

// 這段程式碼配置了 Express-session 和 Passport，用於管理用戶的認證狀態及閃存消息，暫時被註釋掉，可能是未啟用。
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});
