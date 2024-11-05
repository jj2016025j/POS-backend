@echo off
chcp 65001 > nul

echo 啟動 POS-backend 服務...
call start_POS_backend.bat

echo 等待15秒後啟動 POS-UI 服務...
timeout /t 15 /nobreak

echo 啟動 POS-UI 服務...
call start_POS_UI.bat

echo 所有服務已嘗試啟動。
echo 等待5秒後關閉此視窗...
timeout /t 5 /nobreak
exit
