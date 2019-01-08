#!/usr/bin/env bash

set -x

# change to script's directory
base_dir=$(cd `dirname $0`; pwd)
echo 'base_dir:'$base_dir

eosio_ver=`cat $base_dir/eosio_ver`

if [ xb == x"$1" ]; then
  cd $base_dir/devenv/docker/contracts/
  ./build.sh
fi

cd $base_dir/devenv/docker

if [ -e "./data/initialized" ]
then
  script="./scripts/continue_blockchain.sh"
else
  script="./scripts/init_blockchain.sh"
fi

#cd $(pwd)/contracts/compiled_contracts

#eosio-cpp -abigen $(pwd)/contracts/cardgame/cardgame.cpp   -abigen_output $(pwd)/contracts/compiled_contracts/cardgame.abi \
#  -o $(pwd)/contracts/compiled_contracts/cardgame.wasm

#eosio-abigen hello.cpp --contract=hello --output=hello.abi

#--mount type=bind,src="$(pwd)"/contracts,dst=/opt/eosio/bin/contracts \
#--mount type=bind,src="$(pwd)"/scripts,dst=/opt/eosio/bin/scripts \
#--mount type=bind,src="$(pwd)"/data,dst=/mnt/dev/data \

echo "=== run docker container from the eosio/eos-dev image ==="
docker run --rm --name eosio_cardgame_container -d \
-p 8888:8888 -p 9876:9876 \
--volume "$(pwd)"/contracts:/opt/eosio/bin/contracts \
--volume "$(pwd)"/scripts:/opt/eosio/bin/scripts \
--volume "$(pwd)"/data:/mnt/dev/data \
-w "/opt/eosio/bin/" eosio/eos-dev:$eosio_ver /bin/bash -c "$script"

if [ "$1" != "--nolog" ]
then
  echo "=== follow eosio_cardgame_container logs ==="
  docker logs eosio_cardgame_container --follow
fi
