@echo off
chcp 65001 > nul

echo 啟動 POS-backend 服務...
start "POS Backend" cmd /c "cd POS-backend && call mysql_and_server_start.bat"

@REM timeout /t 15 /nobreak > nul
echo 等待15秒後啟動 POS-UI 服務...
timeout /t 15 /nobreak

echo 啟動 POS-UI 服務...
start "POS UI" cmd /c "cd POS-UI && call POS_UI_start.bat"

echo 所有服務已嘗試啟動。
echo 等待5秒後關閉此視窗...
timeout /t 5 /nobreak
exit