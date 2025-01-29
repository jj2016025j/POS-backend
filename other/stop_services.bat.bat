@echo off
echo 關閉 MySQL 伺服器...
start "" "C:\xampp2\mysql_stop.bat"

echo 關閉後端服務...
taskkill /f /im "node.exe" >nul 2>&1

echo 所有服務已關閉
pause
