:: This is just a sample script to pull changes from git and start the server again:

:: pm2 stop "xyz"

rmdir /S /Q dist
rmdir /S /Q node_modules

git pull

yarn
yarn tsc
node ./dist/tests/server.js

:: pm2 restart "xyz"