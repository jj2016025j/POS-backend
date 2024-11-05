@echo off
chcp 65001 > nul
cd /d %~dp0
echo 啟動 POS-UI 服務...
npm start
pause
