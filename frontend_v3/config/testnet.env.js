'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  PROTOCOL:'"https"',
  HOST:'"api-kylin.eosasia.one"',
  PORT:'443',
  CHAINID:'"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"',
  VUE_APP_EOS_CONTRACT_NAME:'"leochancardg"'
})
