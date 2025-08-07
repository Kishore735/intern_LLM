@echo off
REM Full-Stack Chatbot Quick Start Script for Windows

echo 🚀 Starting Full-Stack Chatbot Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...

REM Install frontend dependencies
if not exist "node_modules" (
    call npm install
)

REM Install backend dependencies
cd backend
if not exist "node_modules" (
    call npm install
)
cd ..

echo 🖥️ Starting servers...

REM Start backend server
start "Backend Server" cmd /k "cd backend && npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server
start "Frontend Server" cmd /k "npm run dev"

echo ✅ Servers started successfully!
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:3001
echo 📖 API Health: http://localhost:3001/health
echo.
echo 💡 Make sure LM Studio is running on http://localhost:1234
echo 📋 Close the server windows to stop the application

pause
