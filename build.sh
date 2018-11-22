#! /bin/bash

npm install
npm run build:demo
rm -rf ./node_modules
docker build -t mathijsblok/ngx-alerts-demo:latest .
docker-compose up -d
