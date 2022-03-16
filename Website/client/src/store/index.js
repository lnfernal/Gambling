import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: undefined,
    ranks: {
      0: {
        name: 'User',
        showInChat: false,
        color: '#777',
      },
    },
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
