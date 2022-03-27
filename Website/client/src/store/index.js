import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: undefined,
    userData: undefined,
    money: 0,
    animatedMoney: 0,
    exp: 0,
    animatedExp: 0,
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
      96: {
        name: 'YouTube',
        showRankInChat: true,
        rankColor: '#e44',
        rankTextColor: '#ddd',
        usernameColor: '#f66',
        usernameTextColor: '#ddd',
        contentColor: '#f66',
      },
      97: {
        name: 'Support',
        showRankInChat: true,
        rankColor: '#0984e3',
        rankTextColor: '#ddd',
        usernameColor: '#40a9ff',
        usernameTextColor: '#ddd',
        contentColor: '#40a9ff',
      },
      98: {
        name: 'Mod',
        showRankInChat: true,
        rankColor: '#27ae60',
        rankTextColor: '#ddd',
        usernameColor: '#2ecc71',
        usernameTextColor: '#ddd',
        contentColor: '#2ecc71',
      },
      99: {
        name: 'Admin',
        showRankInChat: true,
        rankColor: '#601',
        rankTextColor: '#ddd',
        usernameColor: '#901',
        usernameTextColor: '#ddd',
        contentColor: '#901',
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
