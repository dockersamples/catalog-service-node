# SDLC End-to-End demo

This demo is designed to help demonstrate Docker and its value across the entire software development lifecycle (SDLC). Specifically, it allows the demonstrator to:

1. Use a containerized development environment to validate an issue, make code changes, and validate the fix
1. Update integration tests (that use Testcontainers) to validate the code change
1. Demonstrate Testcontainers Cloud's benefits in CI pipelines
1. Build the application with the provided Dockerfile
1. Demonstrate Docker Build Cloud's benefits for building of images, both in local development and in CI pipelines
1. Use Scout to identify issues with the newly built image, including an outdated base image and a library with known vulnerabilities

It does so by purposefully modifying the project to:

1. Remove a field that's published in a Kafka event
1. Downgrade the Dockerfile to an older base image (that has known vulnerabilities)
1. Downgrade an application library (express) to an older version with a known vulnerability

## Demo preparation

Apply the `setup.sh` script (assuming running from this folder):

```console
./setup.sh
```
