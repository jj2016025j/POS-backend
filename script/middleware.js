// middleware.js
// 引入 Express 伺服器框架和其他中介軟體，例如 CORS（允許跨域請求）、bodyParser（處理 JSON 和 URL 編碼的請求），並引入獲取 IP 地址的工具函式。
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Middleware 設定
// 設置跨域允許 localhost:3000 的請求，並將 public 資料夾設置為靜態資源目錄。
// 使用 express.json() 和 express.urlencoded() 處理 JSON 和 URL 編碼的請求。
// 使用 bodyParser 處理請求主體數據，確保伺服器能夠解析各種數據格式。
module.exports = (app) => {
    app.use(cors({ origin: 'http://localhost:3000' }));
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};
