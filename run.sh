#!/bin/bash
echo "Pulling lastest!"
git pull

echo "Installing packages!"
npm install

echo "Restart services!"
NODE_ENV=production TESTNET_RPC_URL=http://3.225.191.9:7777/rpc pm2 restart bin/www