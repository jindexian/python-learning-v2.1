@echo off
setlocal enabledelayedexpansion
chcp 936 >nul 2>&1
title Python 学习助手 - 停止本地服务器

rem ===== 查找 8765-8800 端口上的本项目服务进程并结束 =====
set FOUND=0
for /l %%P in (8765,1,8800) do (
    for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":%%P " ^| findstr LISTENING') do (
        echo   结束进程 %%A（端口 %%P）
        taskkill /PID %%A /F >nul 2>&1
        set FOUND=1
    )
)

if "!FOUND!"=="0" (
    echo   没有发现正在运行的 Python 学习助手服务。
) else (
    echo   服务已停止。
)
echo.
pause
endlocal
