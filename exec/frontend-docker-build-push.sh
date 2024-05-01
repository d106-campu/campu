#!/bin/bash 

export REGISTRY=$1

export USERNAME=$2

export PASSWORD=$3

export TAG=$4

export IMG_NAME=frontend

docker system prune -a -f

docker login ${REGISTRY} -u ${USERNAME} -p ${PASSWORD}

docker buildx build -t ${REGISTRY}/${IMG_NAME}:${TAG} ../frontend

docker push ${REGISTRY}/${IMG_NAME}:${TAG}