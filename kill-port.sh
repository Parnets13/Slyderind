#!/bin/bash

# Kill process on port 5289 (or whatever port is in use)
PORT=${1:-5289}

echo "🔍 Finding process on port $PORT..."

# Find the PID
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ No process found on port $PORT"
else
    echo "🔪 Killing process $PID on port $PORT..."
    kill -9 $PID
    echo "✅ Process killed successfully"
fi

# Also stop all PM2 processes
echo "🛑 Stopping all PM2 processes..."
pm2 stop all
pm2 delete all

echo "✅ All processes stopped. You can now start the server."
