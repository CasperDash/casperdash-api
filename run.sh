#!/bin/bash
echo "Pulling lastest!"
git pull

echo "Installing packages!"
npm install

echo "Restart services!"
pm2 restart bin/www