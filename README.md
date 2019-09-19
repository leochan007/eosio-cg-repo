# eosio-cg-repo

echo '000 USER:'$USER
cd frontend_v3/
yarn
chmod a+x *.sh

./gen_img.sh
./push_img.sh

cd ../devenv/k8s

./update_k8s.sh

#kubectl --kubeconfig=/root/k8s_config/luomu-test.yaml --ignore-not-found=true delete -f cg-dapp-stg.yaml
#kubectl --kubeconfig=/root/k8s_config/luomu-test.yaml apply -f cg-dapp-stg.yaml
