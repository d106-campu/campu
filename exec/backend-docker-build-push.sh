#!/bin/bash 

export TAG=$1

export REGISTRY=k10d106.p.ssafy.io

export IMG_NAME=backend

echo TAG=${TAG}

docker login ${REGISTRY} -u ${USERNAME} -p ${PASSWORD}

docker rmi $(docker images ${REGISTRY}/${IMG_NAME} -q)

docker buildx build -t ${REGISTRY}/${IMG_NAME}:${TAG} ../backend

docker push ${REGISTRY}/${IMG_NAME}:${TAG}