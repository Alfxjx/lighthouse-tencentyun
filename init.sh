#!/bin/bash

# 进入 webhook 目录
cd webhooks

# 安装依赖项
npm install

# 返回到项目根目录
cd ..

# 启动 Docker Compose
docker-compose up -d