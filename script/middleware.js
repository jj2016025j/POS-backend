// script/middleware.js

const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require("express-session");
const flash = require("connect-flash");

module.exports = (app) => {
    // 1. 安全性設置 (Helmet)
    app.use(helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    }));

    // 2. 跨域資源共享 (CORS)
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    // 3. 請求日誌設置 (Morgan)
    const NODE_ENV = process.env.NODE_ENV || 'development';
    if (NODE_ENV === 'production') {
        // 生產環境：將詳細日誌寫入文件
        const logStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' });
        app.use(morgan('combined', { stream: logStream }));
    } else {
        // 開發環境：顯示簡潔日誌
        app.use(morgan('dev'));
    }

    // 4. 設置 JSON 和 URL 編碼的請求解析
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 5. 靜態文件服務
    app.use(express.static("public"));

    // 6. Session 設置
    app.use(session({
        secret: process.env.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: NODE_ENV === 'production' } // 只在生產環境中啟用 secure cookie
    }));

    // 7. Flash 訊息
    app.use(flash());

    // 8. 全局變量設置（便於使用 flash 消息）
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        next();
    });
};
