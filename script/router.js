// router.js
// 路由設定 將 menu, order, pay, 和 data 路徑的請求分別轉交給相應的路由模組。

const menuRouter = require('./router/menuRouter');
const orderRouter = require('./router/orderRouter');
const payRouter = require('./router/payRouter');
const dataRouter = require('./router/dataRouter');

module.exports = (app) => {
    app.use('/menu', menuRouter);
    app.use('/order', orderRouter);
    app.use('/pay', payRouter);
    app.use('/data', dataRouter);
};
