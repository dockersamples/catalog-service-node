#!/bin/bash

REPO_ROOT=$(git rev-parse --show-toplevel)
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
BRANCH_NAME=demo-$(date +%Y%d%m)-$(whoami)

cd "$REPO_ROOT"

echo "==> Setting up branch a demo branch named ${BRANCH_NAME}"
git clean -f
git branch -D temp 2>/dev/null || true
git branch -D $BRANCH_NAME 2>/dev/null || true
git checkout -b temp
git branch -D main
git checkout main
git branch -D temp
git pull
git checkout -b $BRANCH_NAME

echo "==> Applying patch and creating a commit"
git apply --whitespace=fix "${SCRIPT_DIR}/demo.patch"
git commit -am "Demo prep"

echo "==> Installing npm dependencies"
npm install

echo "==> Downloading container images"
docker compose pull

echo "==> Deleting postgres:17.2 container image"
docker image rm postgres:17.2 || true

echo "==> Configuring DBC (if this fails, ask to be added to the dockerdevrel organization)"
docker buildx create --driver cloud dockerdevrel/demo-builder 2>/dev/null || true
docker buildx use cloud-dockerdevrel-demo-builder

echo "==> Configuring Scout"
docker scout config organization dockerdevrel
