#!/bin/bash

echo "Installing server dependencies..."
cd server
npm install

echo "Installing UI dependencies..."
cd ../ui
npm install

echo "Starting the application..."
cd ../server
npm run start:dev &
cd ../ui
npm start 