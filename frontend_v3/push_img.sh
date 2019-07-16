#!/bin/bash

set -x

source module_def.sh

if [ -n "$1" ]; then
  FLAG=$1
fi

if [ "testnet" != "$FLAG" ]; then
  img_name=$img_name-stg
fi

VER=`git rev-parse HEAD`
echo 'VER:'$VER

docker push repo.alphacario.com:8089/$img_name:v1
