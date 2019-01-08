##-------------------------------------------------------------------------------
#start testnet env
docker stop eosio_t && docker rm -v eosio_t

docker run --name eosio_t --publish 127.0.0.1:8888:8888 \
  -v ~/test-eosio-wallet:/root/eosio-wallet \
  --volume ~/Documents/src_codes/eos/contracts:/contracts \
  --detach \
  eosio/eos:v1.5.1 \
  /bin/bash -c \
  "keosd --http-server-address=0.0.0.0:8888"

alias tcleos="docker exec -i eosio_t /opt/eosio/bin/cleos --wallet-url http://127.0.0.1:8888 -u https://api-kylin.eosasia.one"
api-kylin.eosasia.one
5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191
#leochancardg
{"msg": "succeeded", "keys": {"active_key": {"public": "EOS7dhtj8PHspuwUCR5Mp7mAfMZ2SnzJNDEF5YZMHgohWMTUNVep1", "private": "5KWNzZXpXiJ1PqBT9TZbVLdZffPVrFeEtFNmKx445s9sxqpkvme"}, "owner_key": {"public": "EOS8BiVpppEjzbwv6thY6TEGv4TSftrAy45q8STHuAQdXDTn4wiR9", "private": "5JPo5oFDWbMCii487PGTjT83K3WTxuURKD2MwVYZTCJGPEKnNTw"}}, "account": "leochancardg"}

#demoplayercg
{"msg": "succeeded", "keys": {"active_key": {"public": "EOS653sH7gFATduqyiWJT6CFgnVjLnrCUjZB54Hmgh2jKk5w2gp8e", "private": "5JL6ASMR8Rz1jBUJRJodHRuqYBLGQyz32bgceb2y22L8BRbaWix"}, "owner_key": {"public": "EOS4xbjLcVEQ7W89MYRbB4TrtoYZ3SFG5RhgaQMC25UwQpBgpuYWv", "private": "5KFMVngjByoCzS1J2EQdrfQwdkrnqEHKhwcbgk5WqMXxPBHHQSV"}}, "account": "demoplayercg"}

http://jungle2.cryptolions.io:80
https://jungle2.cryptolions.io:443
https://api.jungle.alohaeos.com:443
http://145.239.133.201:8888
http://eos.eosza.io:8888
https://jungle.eosn.io:443
http://jungle.eosbcn.com:8080
http://jungle.eosmetal.io:18888
http://jungle2-eos.blckchnd.com:8888
http://88.99.193.44:8888
https://jungleapi.eossweden.se:443

http://39.108.231.157:30065/v1/chain/get_info
https://api.kylin-testnet.eospacex.com/v1/chain/get_info
http://kylin.fn.eosbixin.com/v1/chain/get_info
http://api.kylin.eoseco.com/v1/chain/get_info
http://13.125.53.113:8888/v1/chain/get_info
http://119.254.15.40:8888/v1/chain/get_info
https://api.kylin.alohaeos.com/v1/chain/get_info
http://api.kylin.helloeos.com.cn/v1/chain/get_info
http://api-kylin.starteos.io/v1/chain/get_info
http://kylin-fn001.eossv.org/v1/chain/get_info
http://api-kylin.eoshenzhen.io:8890/v1/chain/get_info
http://api.kylin.eosbeijing.one:8880/v1/chain/get_info
http://testnet.zbeos.com/v1/chain/get_info
https://kylin.eoscanada.com
http://kylin-testnet.jeda.one:8888/v1/chain/get_info
http://kylin.meet.one:8888/v1/chain/get_info

https://api-kylin.eoslaomao.com/v1/chain/get_info
https://api-kylin.eosasia.one/v1/chain/get_info
