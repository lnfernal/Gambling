import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: undefined,
    ranks: {
      0: {
        name: 'User',
        showRankInChat: false,
        rankColor: '#555',
        rankTextColor: '#eee',
        usernameColor: '#777',
        usernameTextColor: '#eee',
        contentColor: '#bbb',
      },
      100: {
        name: 'Owner',
        showRankInChat: true,
        rankColor: '#a02',
        rankTextColor: '#ddd',
        usernameColor: '#d01',
        usernameTextColor: '#ddd',
        contentColor: '#c55',
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
