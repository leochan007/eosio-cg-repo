import Vue from 'vue';
import App from './components/App/App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import VModal from 'vue-js-modal';

Vue.use(VModal, { dialog: true });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
