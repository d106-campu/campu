#!/bin/bash 

cd ../frontend

rm -rf dist

chmod -R 755 . && cp ${PROD_ENV} .