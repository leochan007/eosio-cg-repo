#!/bin/bash

#https://github.com/cryptokylin/CryptoKylin-Testnet#http-api-list

#http://faucet.cryptokylin.io/create_account?leochancardg
#http://faucet.cryptokylin.io/get_token?leochancardg
#http://faucet.cryptokylin.io/get_token?demoplayercg

tcleos wallet open

tcleos wallet unlock --password PW5Jhock9AYNjiExjTis3RaqoFfLktu7VcwVNq6wLmYF9cYCHRNk9

tcleos wallet private_keys --password PW5Jhock9AYNjiExjTis3RaqoFfLktu7VcwVNq6wLmYF9cYCHRNk9

#active
tcleos wallet import --private-key 5KWNzZXpXiJ1PqBT9TZbVLdZffPVrFeEtFNmKx445s9sxqpkvme

#owner
tcleos wallet import --private-key 5JPo5oFDWbMCii487PGTjT83K3WTxuURKD2MwVYZTCJGPEKnNTw

#tcleos system delegatebw --buyram '400 EOS' leochancardg leochancardg '200 EOS' '200 EOS'
#tcleos system delegatebw --buyram '200 EOS' demoplayercg demoplayercg '300 EOS' '300 EOS'

tcleos set contract leochancardg /contracts/eosio-cg-repo/devenv/docker/contracts/build/cardgame \
cardgame.wasm cardgame.abi -p leochancardg@active

tcleos get table leochancardg leochancardg users
