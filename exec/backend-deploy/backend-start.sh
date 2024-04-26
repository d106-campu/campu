#!/bin/bash

export TAG="${GIT_COMMIT_HASH}"

sed -i "/^TAG=/c\TAG=${TAG}" .env

docker compose pull

docker compose up -d

docker system prune -a -f