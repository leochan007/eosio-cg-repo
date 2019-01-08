import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

/*
import VuexPersist from 'vuex-persist';
const vuexPersist = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
});
*/

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

let plugins = debug ? [createLogger()]: [];

//plugins.concat(vuexPersist.plugin);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: plugins,
});
