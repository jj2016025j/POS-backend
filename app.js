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

// 3. 資料庫連接初始化
const { initializeDatabase } = require('./script/database/init');
initializeDatabase().then(() => {
    console.log("Database connected successfully");

    // 4. 設置基本中間件
    const setupMiddleware = require('./script/middleware');
    setupMiddleware(app);

    // 5. 設置路由
    require('./script/router')(app);

    // 6. 加載錯誤處理中間件
    const errorHandler = require('./script/utils/errorHandler');
    app.use(errorHandler);

    // 7. 啟動伺服器
    require('./script/server')(app, port);

}).catch(error => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
});

// 8. 全局錯誤監控
process.on('uncaughtException', (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1); // 終止程序
});

process.on('unhandledRejection', (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1); // 終止程序
});