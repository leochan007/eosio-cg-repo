import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

let plugins = getters.debug ? [createLogger()]: [];

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: getters.debug,
  plugins: plugins,
});
