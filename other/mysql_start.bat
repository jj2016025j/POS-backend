@chcp 65001 > nul
@echo off
cd /d %~dp0

echo Starting MySQL Service...
cd C:\xampp
mysql_start.bat

pause
