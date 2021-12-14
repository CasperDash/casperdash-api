#!/bin/bash
echo "Pulling lastest!"
git pull

echo "Installing packages!"
yarn

echo "Restart services!"
pm2 restart pm2.config.js --env staging