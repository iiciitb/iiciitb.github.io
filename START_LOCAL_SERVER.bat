@echo off
title IIC IIT Bombay Website - Local Preview
echo.
echo  ============================================================
echo   IIC IIT Bombay Website  -  Local Preview Server
echo  ============================================================
echo.
echo  Starting server. Once you see "Serving HTTP on...":
echo.
echo    1. Open your browser
echo    2. Go to:   http://localhost:8080
echo.
echo  To stop the server, close this window.
echo.
echo  ============================================================
echo.

cd /d "%~dp0"

REM Try python first (Python 3), then py launcher, then python3
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 8080
  goto :done
)

where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server 8080
  goto :done
)

echo.
echo  Python is not installed on this machine.
echo.
echo  EASIER ALTERNATIVE:
echo  Just double-click index.html in this folder. Chrome will
echo  open the website directly with no server needed.
echo.
pause
exit /b 1

:done
echo.
pause
