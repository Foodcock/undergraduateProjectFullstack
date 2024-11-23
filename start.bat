@echo off

cd /d ".\front-end\"

start cmd /k "npm run serve"

cd /d "..\back-end\"

start cmd /k "npm run go"

echo Two commands have been started in separate windows.
