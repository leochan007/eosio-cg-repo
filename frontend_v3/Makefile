run_local:
	 yarn run serve

run_testnet:
	#TESTNET=testnet NODE_ENV=development vue inspect > vue_inspect_dev.js
	TESTNET=testnet yarn run serve

build_testnet:
	#TESTNET=testnet NODE_ENV=production vue inspect > vue_inspect_prod.js
	TESTNET=testnet yarn run build

build_testnet_stg:
	#TESTNET=testnet_stg NODE_ENV=production vue inspect > vue_inspect_stg.js
	TESTNET=testnet_stg yarn run build

build_prod:
	yarn run build
