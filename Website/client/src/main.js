import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './plugins/api';
import config from './plugins/config';

Vue.config.productionTip = false;

Vue.use(config);
Vue.use(api);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
