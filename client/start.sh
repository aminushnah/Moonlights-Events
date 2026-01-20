#!/bin/bash

# Quick Start Script for Moon Light Events React Project

echo "============================================"
echo "Moon Light Events - React Setup"
echo "============================================"
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "Dependencies already installed. Skipping npm install..."
else
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error installing dependencies!"
        exit 1
    fi
fi

echo ""
echo "Starting development server..."
echo "The application will open at http://localhost:3000"
echo ""
echo "Default Login Credentials:"
echo "Email: user@gmail.com"
echo "Password: 123456"
echo ""
echo "Press Ctrl+C to stop the server"
echo "============================================"
echo ""

npm start
