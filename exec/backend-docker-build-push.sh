#!/bin/bash 

export TAG=0.0.1
export REGISTRY=k10d106.p.ssafy.io

export IMG_NAME=backend

docker login $REGISTRY -u $USERNAME -p $PASSWORD

docker buildx build -t $REGISTRY/$IMG_NAME:$TAG ../backend

docker push $REGISTRY/$IMG_NAME:$TAG

docker system prune -a -f