@echo off
chcp 65001 > nul

echo 正在啟動 POS UI 服務...
cd POS-UI
call POS_UI_start.bat
cd ..
