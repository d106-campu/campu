#!/bin/bash

export REGISTRY=$1

export USERNAME=$2

export PASSWORD=$3

export TAG=$4

sed -i "/^TAG=/c\TAG=${TAG}" .env

docker login ${REGISTRY} -u ${USERNAME} -p ${PASSWORD}

docker compose pull

docker compose up -d

docker system prune -a -f