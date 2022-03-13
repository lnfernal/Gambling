import Vue from 'vue';
import App from './App.vue';
import store from './store';
import config from './plugins/config';
import router from './router';
import utils from './plugins/utils';
import api from './plugins/api';
import socket from './plugins/socket';

Vue.config.productionTip = false;

Vue.use(config);
Vue.use(utils);
Vue.use(api);
Vue.use(socket);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
