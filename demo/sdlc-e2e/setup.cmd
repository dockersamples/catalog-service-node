@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM This script runs from outside the repo to avoid being deleted by git clean

REM set "REPO_ROOT=C:\Users\msmik\Documents\src\catalog-service-node"
REM "SCRIPT_DIR=%REPO_ROOT%\demo\sdlc-e2e"
REM cd /d "%REPO_ROOT%"

for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "(Get-Date).ToString('yyyyMMdd')"`) do set "DATE_STAMP=%%I"
for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "$env:USERNAME.ToLower()"`) do set "SAFE_USER=%%I"
set "BRANCH_NAME=demo-%DATE_STAMP%-%SAFE_USER%"



echo ==> Setting up branch a demo branch named %BRANCH_NAME%
git clean -f
git branch -D temp 2>nul || echo.
git branch -D %BRANCH_NAME% 2>nul || echo.
git checkout -b temp
git branch -D main 2>nul || echo.
git checkout main
git branch -D temp 2>nul || echo.
git pull
git checkout -b %BRANCH_NAME%

echo ==> Applying patch and creating a commit
powershell -NoProfile -Command "(Get-Content '%SCRIPT_DIR%\demo.patch' -Raw) -replace '`n', \"`r`n\" | Set-Content '%TEMP%\demo-windows.patch' -NoNewline"
git apply --whitespace=fix "%TEMP%\demo-windows.patch"
del "%TEMP%\demo-windows.patch" 2>nul
git commit -am "Demo prep"

echo ==> Installing npm dependencies  
call npm install
echo ==> npm install completed

echo ==> Downloading container images
docker compose pull

echo ==> Deleting postgres:17.2 container image
docker image rm postgres:17.2 2>nul || echo.

echo ==> Configuring DBC (if this fails, ask to be added to the dockerdevrel organization)
docker buildx create --driver cloud dockerdevrel/demo-builder 2>nul || echo.
docker buildx use cloud-dockerdevrel-demo-builder

echo ==> Configuring Scout
docker scout config organization dockerdevrel

echo ==> Setup complete!