#!/bin/bash

# Install backend dependencies if not already installed
echo "Installing backend dependencies..."
pip3 install -r requirements.txt

# Install frontend dependencies if not already installed
echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Start backend and frontend in parallel
echo "Starting backend and frontend servers..."
(cd frontend && npm start) & # Start frontend on port 3000
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload # Start backend on port 8000

# The script will keep running until you press Ctrl+C