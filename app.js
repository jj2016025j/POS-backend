// app.js
// 載入 .env 檔案中的環境變量
const dotenv = require("dotenv");
dotenv.config();

// 建立 Express 伺服器和設置埠
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// 初始化打印機
// initPrinter()

// 匯入並應用中介軟體模組
require('./middleware')(app);

// 匯入並應用路由模組
require('./router')(app);

// 啟動伺服器
require('./server')(app, port);
