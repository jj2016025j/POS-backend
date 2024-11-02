@chcp 65001 > nul
@echo off
cd /d %~dp0
echo 啟動 Node.js 伺服器...
npm start
echo 正在執行 [芳鍋] 後端伺服器...

pause
