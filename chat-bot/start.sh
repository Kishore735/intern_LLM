#!/bin/bash

# Full-Stack Chatbot Quick Start Script
echo "🚀 Starting Full-Stack Chatbot Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if MongoDB is running (optional - will show warning if not)
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  Warning: MongoDB doesn't appear to be running. Please start MongoDB for full functionality."
fi

echo "📦 Installing dependencies..."

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    npm install
fi

# Install backend dependencies
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo "🖥️  Starting servers..."

# Start backend server in background
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend server
npm run dev &
FRONTEND_PID=$!

echo "✅ Servers started successfully!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:3001"
echo "📖 API Health: http://localhost:3001/health"
echo ""
echo "💡 Make sure LM Studio is running on http://localhost:1234"
echo "📋 Press Ctrl+C to stop all servers"

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap for cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
wait
