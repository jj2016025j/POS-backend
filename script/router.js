// router.js
const passport = require("./config/passport");

// 引入業務邏輯的路由模組
const menuRouter = require('./router/menuRouter');
const orderRouter = require('./router/orderRouter');
const paymentRouter = require('./router/paymentRouter');
const dataRouter = require('./router/dataRouter');

module.exports = (app) => {
    // 認證路由設定
    app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
    app.get("/auth/google/redirect", passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
    }));

    app.get("/auth/line", passport.authenticate("line", { scope: ["profile", "openid", "email"] }));
    app.get("/auth/line/redirect", passport.authenticate("line", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
    }));

    // 業務路由設定
    app.use('/menu', menuRouter);
    app.use('/order', orderRouter);
    app.use('/pay', paymentRouter);
    app.use('/data', dataRouter);
};
