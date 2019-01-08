#!/usr/bin/env bash
set -o errexit

# set PATH
PATH="$PATH:/opt/eosio/bin"

CONTRACTSPATH="$( pwd -P )/contracts"

# make new directory for compiled contract files
#mkdir -p ./compiled_contracts
#mkdir -p ./compiled_contracts/$1

COMPILEDCONTRACTSPATH="$( pwd -P )/contracts/build"

# unlock the wallet, ignore error if already unlocked
if [ ! -z $3 ]; then cleos wallet unlock -n $3 --password $4 || true; fi

# compile smart contract to wast and abi files
#(
#  eosio-cpp -o "$COMPILEDCONTRACTSPATH/$1/$1.wast" "$CONTRACTSPATH/$1/$1.cpp" &&
#  eosio-cpp -g "$COMPILEDCONTRACTSPATH/$1/$1.abi" "$CONTRACTSPATH/$1/$1.cpp"
#) &&

# set (deploy) compiled contract to blockchain
cleos set contract $2 "$COMPILEDCONTRACTSPATH/$1/" --permission $2
