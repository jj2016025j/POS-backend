// app.js

// 1. 載入 .env 檔案中的環境變量
const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// 2. 環境檢查與配置
const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'production') {
    console.log(`Running in ${NODE_ENV} mode`);
    // 初始化打印機
    // initPrinter()
} else {
    console.log(`Running in ${NODE_ENV} mode`);
}

// 資料庫連接
const { initializeDatabase } = require('./script/database');
initializeDatabase(); // 測試並初始化資料庫

// 5. 基本中間件設置（安全性、日誌）
const helmet = require('helmet');
const morgan = require('morgan');
app.use(helmet()); // 設置安全標頭
app.use(morgan('dev')); // 請求日誌

app.use(helmet({
    contentSecurityPolicy: false, // 關閉 Content-Security-Policy (若不需要)
    crossOriginEmbedderPolicy: false, // 停用嵌入策略，視需求而定
}));

const fs = require('fs');
const path = require('path');
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: logStream })); // 'combined' 模式提供更詳細的日誌

// 匯入並應用中介軟體模組
require('./script/middleware')(app);

// 匯入並應用路由模組
require('./script/router')(app);

// 加載錯誤處理中間件
const errorHandler = require('./script/middlewares/errorHandler');
app.use(errorHandler);

// 6. 啟動伺服器
require('./script/server')(app, port);
