@echo off
setlocal enabledelayedexpansion
chcp 936 >nul 2>&1
title Python 学习助手 - 本地服务器
cd /d "%~dp0"

rem ===== 查找可用的 Node.js =====
set "NODE_CMD=node"
where node >nul 2>&1
if not errorlevel 1 goto :pickport

set "NODE_CMD=C:\Users\金金\.workbuddy\binaries\node\versions\22.22.2-2\node.exe"
if exist "%NODE_CMD%" goto :pickport

echo.
echo   [错误] 没有找到 Node.js
echo.
echo   请先安装 Node.js： https://nodejs.org/
echo.
pause
exit /b 1

rem ===== 自动挑选可用端口：从 8765 开始，最多试到 8800 =====
:pickport
set PORT=8765

:checkport
netstat -ano | findstr ":!PORT! " | findstr LISTENING >nul 2>&1
if errorlevel 1 goto :portok

set /a PORT+=1
if !PORT! GTR 8800 (
    echo.
    echo   [错误] 8765 - 8800 端口全部被占用，无法启动。
    echo.
    pause
    exit /b 1
)
goto :checkport

:portok
echo.
echo   ============================================
echo.
echo        Python 学习助手
echo.
echo   ============================================
echo.
echo     服务端口： !PORT!
echo     访问地址： http://localhost:!PORT!/
echo.
if not "!PORT!"=="8765" (
    echo     * 提示：8765 已被其他程序占用，
    echo       已自动改用 !PORT! 端口
    echo.
)
echo     * 请保持本窗口开启（关闭窗口即停止服务）
echo.
echo   ============================================
echo.

rem 延迟约 2 秒后自动打开浏览器
start "" /MIN cmd /c "ping -n 3 127.0.0.1 >nul & start http://localhost:!PORT!/"

rem 把端口传给 server.js
set PORT=!PORT!
"%NODE_CMD%" server.js

echo.
echo     服务已停止。
echo.
pause
endlocal
