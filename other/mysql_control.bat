@echo off
chcp 65001 > nul
cd /d %~dp0

if "%1"=="start" (
    echo 檢查 MySQL 是否已經啟動...
    tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
    if "%ERRORLEVEL%"=="0" (
        echo MySQL 資料庫已經在執行。
    ) else (
        echo 正在啟動 MySQL 資料庫...
        cd C:\xampp
        start "" /b mysql\bin\mysqld --defaults-file=mysql\bin\my.ini --standalone
        echo 等待 MySQL 資料庫啟動中...
        :wait_start
        netstat -an | find "3306" >nul || (timeout /t 1 >nul & goto wait_start)
        echo MySQL 資料庫已完成啟動。
    )
) else if "%1"=="stop" (
    echo 正在關閉 MySQL 資料庫...
    cd C:\xampp\mysql\bin
    mysqladmin -u root shutdown
    echo 等待資料庫關閉中...
    :wait_shutdown
    tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
    if "%ERRORLEVEL%"=="0" (
        timeout /t 1 >nul
        goto wait_shutdown
    )
    echo MySQL 資料庫已關閉。
) else (
    echo 請使用 "start" 或 "stop" 參數來啟動或關閉 MySQL。
)
