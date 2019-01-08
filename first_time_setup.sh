#!/usr/bin/env bash

echo "=== start of first time setup ==="

# change to script's directory
base_dir=`dirname $0`
cd $base_dir
SCRIPTPATH="$( pwd -P )"

# make sure Docker and Node.js is installed
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v npm)" ]; then
  echo ""
  echo -e "\033[0;31m[Error with Exception]\033[0m"
  echo "Please make sure Docker and Node.js are installed"
  echo ""
  echo "Install Docker: https://docs.docker.com/docker-for-mac/install/"
  echo "Install Node.js: https://nodejs.org/en/"
  echo ""
  exit
fi

# download eosio/eos-dev image
eosio_ver=`cat $base_dir/eosio_ver`
data_dir=./devenv/docker/data

if [ xu == x"$1" ]; then
  echo "=== pull eosio/eos-dev image $eosio_ver from docker hub ==="
  docker pull eosio/eos-dev:$eosio_ver
fi

# force remove the perivous container if any
# create a clean data folder in eosio_docker to preserve block data
echo "=== setup/reset data for eosio_docker ==="
docker rm --force eosio_cardgame_container
sudo rm -rf $data_dir
mkdir -p $data_dir

# set up node_modules for frontend

if [ xu == x"$1" ]; then
echo "=== yarn install packpage for frontend react app ==="
# change directory to ./frontend
cd "$SCRIPTPATH/frontend_v3"
yarn
fi
