#!/bin/bash

export TAG=${env.GIT_COMMIT}

sed -i "/^TAG=/c\TAG=${TAG}" docker-compose.yml

docker compose pull

docker compose up -d

docker system prune -a -f