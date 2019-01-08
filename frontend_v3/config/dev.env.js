'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PROTOCOL:'"http"',
  HOST:'"0.0.0.0"',
  PORT:'8888',
  CHAINID:'"cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"',
  VUE_APP_EOS_CONTRACT_NAME:'"cardgameacc"'
})
