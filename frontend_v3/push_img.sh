#!/bin/bash

set -x

FLAG=testnet_stg

if [ -n "$1" ]; then
  FLAG=$1
fi

img_name=cg-dapp

if [ "testnet" != "$FLAG" ]; then
  img_name=$img_name-stg
fi

VER=`git rev-parse HEAD`
echo 'VER:'$VER

docker push nexus.alphacario.com:8089/$img_name:v1
