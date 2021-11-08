#!/bin/bash
echo "Pulling lastest!"
git pull

echo "Installing packages!"
npm install

echo "Restart services!"
NODE_ENV=production pm2 restart bin/www