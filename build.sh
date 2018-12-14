#! /bin/bash

npm install
npm run build:demo
docker build -t mathijsblok/ngx-alerts-demo:latest .
rm -rf ./node_modules
rm -rf ./dist
docker-compose up -d
