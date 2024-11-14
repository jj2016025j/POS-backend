@echo off
echo 啟動 MySQL 伺服器...
start /min "" "C:\xampp2\mysql_start.bat"
timeout /t 3 /nobreak >nul

echo 啟動後端服務...
cd /d "C:\Users\User\WebPractice\POS-backend"
start /b yarn dev
@REM start /min yarn dev
@REM start cmd /k "yarn dev"

echo 所有服務已啟動
