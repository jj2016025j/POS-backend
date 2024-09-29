const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
// require("./script/passport");
// const passport = require("passport");
// const session = require("express-session");
// const flash = require("connect-flash");
const path = require('path');
const { getLocalIPAddress, getNetIPAddress, getPublicIP } = require('./script/getIPAddress.js');

const app = express();
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
}));

const port = 8000;
//設定middleware跟排版引擎
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         cookie: { secure: false },
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash("success_msg");
//     res.locals.error_msg = req.flash("error_msg");
//     res.locals.error = req.flash("error");
//     next();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));

// 初始化打印機
// initPrinter()

// http://localhost:8080/menu
const menuRouter = require('./script/router/menuRouter');
app.use('/menu', menuRouter);

// http://localhost:8080/order
const orderRouter = require('./script/router/orderRouter');
app.use('/order', orderRouter);

// http://localhost:8080/pay
const payRouter = require('./script/router/payRouter');
app.use('/pay', payRouter);

// http://localhost:8080/data
const dataRouter = require('./script/router/dataRouter');
app.use('/data', dataRouter);



(async () => {
    try {
        const localIP = getLocalIPAddress();
        const publicIPOld = await getNetIPAddress(); // 等待公網 IP 地址的 Promise 解析
        const publicIP = await getPublicIP(); // 等待公網 IP 地址的 Promise 解析

        app.listen(port, () => {
            console.log(`測試: http://localhost:${port}`);
            console.log(`局域網 IPv4 地址:  http://${localIP}:${port}`);
            // if (publicIPOld) {
            //     // // console.log(`公網 IPv4 地址:  http://${publicIPOld}:${port}`);
            // }
            // if (publicIP) {
            //     // // console.log(`公網 IPv4 地址:  http://${publicIP}:${port}`);
            // }
        });
    } catch (error) {
        console.error('獲取 IP 地址時發生錯誤: ', error);
    }
})();