#!/bin/bash

sed -i "/^TAG=/c\TAG=${TAG}" .env

docker compose pull

docker compose up -d

docker system prune -a -f