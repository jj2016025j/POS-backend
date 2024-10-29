// 載入 .env 檔案中的環境變量
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');

// 建立 Express 伺服器和設置埠

const app = express();
const port = 8000;

// 初始化打印機
// initPrinter()

// 匯入並應用中介軟體模組
require('./middleware')(app);

// 匯入並應用路由模組
require('./router')(app);

<<<<<<< Updated upstream
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
=======
// 啟動伺服器
require('./server')(app, port);
>>>>>>> Stashed changes
