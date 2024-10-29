// middleware.js
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/passport");

module.exports = (app) => {
    // CORS 設置，允許從 localhost:3000 的跨域請求
    app.use(cors({ origin: 'http://localhost:3000' }));

    // 靜態文件目錄設定
    app.use(express.static("public"));

    // 處理 JSON 和 URL 編碼請求
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // 使用 bodyParser 處理請求主體數據
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // 設定 Express session
    app.use(
        session({
            secret: process.env.SESSION_SECRET || "default_secret",
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }, // 若使用 HTTPS，可以設定為 true
        })
    );

    // 初始化 Passport 認證
    app.use(passport.initialize());
    app.use(passport.session());

    // 設置 flash 消息，用於提示信息
    app.use(flash());

    // 設置全局變量，便於前端使用 flash 消息
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        next();
    });
};
