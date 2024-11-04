// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/databaseConfig');
const { envCheck } = require('../test/testEnv');

// 測試伺服器連線
router.get('/ping', (req, res) => {
  res.send('伺服器正常運行');
});

// 測試資料庫連線
router.get('/db-check', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('資料庫連線正常');
  } catch (error) {
    console.error('資料庫連線失敗:', error);
    res.status(500).send('資料庫連線失敗');
  }
});

// 測試環境變數
router.get('/env-check', (req, res) => {
  envCheck()
  res.json({
    ...envCheck(),
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    // 確保密碼安全，不直接顯示
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? '已設定' : '未設定'
  });
});

module.exports = router;
