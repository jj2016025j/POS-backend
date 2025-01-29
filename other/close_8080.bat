@echo off
echo 檢查 8080 埠是否被佔用...

for /f "tokens=5" %%i in ('netstat -ano ^| findstr :8080') do (
    echo 發現佔用 8080 埠的程序 PID: %%i
    taskkill /PID %%i /F
    echo 已關閉 PID %%i 的程序
)

echo 所有佔用 8080 埠的程序已關閉
