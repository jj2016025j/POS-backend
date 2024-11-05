@echo off
chcp 65001 > nul

echo 正在啟動 MySQL 服務...
call mysql_control.bat start

echo 檢查端口8000是否被占用並啟動 Node.js 伺服器...
call start_node_server.bat

echo POS Backend 服務已啟動。
