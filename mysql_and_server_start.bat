@echo off
chcp 65001 > nul
cd /d %~dp0

echo 正在確認資料庫是否已經啟用...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo 發現未關閉的MYSQL資料庫...
    cd C:\xampp\mysql\bin
    mysqladmin -u root shutdown
    echo 正在等待資料庫關閉...
    :wait_shutdown
    tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
    if "%ERRORLEVEL%"=="0" (
        timeout /t 1 >nul
        goto wait_shutdown
    )
    echo 已關閉資料庫...
)

echo 正在啟動MySQL資料庫...
cd C:\xampp
start "" /b mysql\bin\mysqld --defaults-file=mysql\bin\my.ini --standalone
echo 正在等待資料庫啟動...
:wait_start
netstat -an | find "3306" >nul || (timeout /t 1 >nul & goto wait_start)
echo MySQL資料庫已完成啟動...

echo 檢查端口8000是否被占用...
for /f "tokens=5" %%a in ('netstat -aon ^| find "LISTENING" ^| find ":8000"') do set "PID=%%a"
if defined PID (
    echo 端口8000已被占用，正在嘗試關閉佔用該端口的程序...
    taskkill /f /pid %PID% /T
    echo 等待程序關閉...
    timeout /t 2 >nul
)

cd /d %~dp0
echo 啟動 Node.js 伺服器...
start "" /b npm start
echo 正在執行 [芳鍋] 後端伺服器...

exit
