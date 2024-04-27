#!/bin/bash 

export TAG=$1

export REGISTRY=k10d106.p.ssafy.io

export IMG_NAME=backend

docker login ${REGISTRY} -u ${USERNAME} -p ${PASSWORD}

docker buildx build ${REGISTRY}/${IMG_NAME}:${TAG} ../backend

docker push ${REGISTRY}/${IMG_NAME}:${TAG}