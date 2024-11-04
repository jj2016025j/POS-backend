// router.js
// const passport = require("./config/passport");

// 引入業務邏輯的路由模組
const dataRoutes = require('./router/dataRoutes');
const menuRoutes = require('./router/menuRoutes');
const orderRoutes = require('./router/orderRoutes');
const paymentRoutes = require('./router/paymentRoutes');
const testRoutes = require('./router/testRoutes');

module.exports = (app) => {
    // // 認證路由設定
    // app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
    // app.get("/auth/google/redirect", passport.authenticate("google", {
    //     successRedirect: "/dashboard",
    //     failureRedirect: "/login",
    // }));

    // app.get("/auth/line", passport.authenticate("line", { scope: ["profile", "openid", "email"] }));
    // app.get("/auth/line/redirect", passport.authenticate("line", {
    //     successRedirect: "/dashboard",
    //     failureRedirect: "/login",
    // }));

    // 業務路由設定
    app.use('/menu', menuRoutes);
    app.use('/order', orderRoutes);
    app.use('/pay', paymentRoutes);
    app.use('/data', dataRoutes);
    app.use('/test', testRoutes);
};
