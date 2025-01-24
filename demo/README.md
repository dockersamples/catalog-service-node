# Demo help

This directory contains various patches that can be applied to this project to prepare it for various demos.

Why this instead of using other branches? Simply put, reduced maintenance. As we make updates to the main branch, it's easier to maintain a few patches than several branches.

- [SDLC End-to-end](./sdlc-e2e/) - a demo of Docker's products across the entire SDLC

## Scout demo

For a Scout demo, the following patch will adjust the Dockerfile to use an older base image and install an older version of Express, allowing you to demo out-of-date base images and vunlerable dependencies.

```console
git apply --whitespace=fix demo/scout.patch
```
