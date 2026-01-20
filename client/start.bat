@echo off
REM Quick Start Script for Moon Light Events React Project

echo ============================================
echo Moon Light Events - React Setup
echo ============================================
echo.

REM Check if node_modules exists
if exist node_modules (
    echo Dependencis already installed. Skipping npm install...
) else (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error installing dependencies!
        pause
        exit /b 1
    )
)

echo.
echo Starting development server...
echo The application will open at http://localhost:3000
echo.
echo Default Login Credentials:
echo Email: user@gmail.com
echo Password: 123456
echo.
echo Press Ctrl+C to stop the server
echo ============================================
echo.

call npm start
