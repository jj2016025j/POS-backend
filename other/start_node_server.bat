@echo off
chcp 65001 > nul
cd /d %~dp0

echo 檢查端口 8000 是否被占用...
for /f "tokens=5" %%a in ('netstat -aon ^| find "LISTENING" ^| find ":8000"') do set "PID=%%a"
if defined PID (
    echo 端口 8000 已被占用，正在嘗試關閉佔用該端口的程序...
    taskkill /f /pid %PID% /T
    echo 等待程序關閉...
    timeout /t 2 >nul
)

echo 啟動 Node.js 伺服器...
start "" /b npm start
echo Node.js 伺服器已啟動。
