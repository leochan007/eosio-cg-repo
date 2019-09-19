#!/bin/bash

#kubectl config use-context luomu-test

NS=' --namespace cg-dapp '

K8S_OPT1=' --kubeconfig=/root/k8s_config/luomu-test.yaml '
K8S_OPT2=' --ignore-not-found=true '

CMD_PATH=`dirname $0`
cd $CMD_PATH

prj_name=cp-dapp

kubectl ${K8S_OPT1} delete ${K8S_OPT2} -f ${prj_name}-stg.yaml
kubectl ${K8S_OPT1} apply -f ${prj_name}-stg.yaml
