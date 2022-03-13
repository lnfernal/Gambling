import Vue from 'vue';
import VueRouter from 'vue-router';
import Roulette from '../views/pages/roulette/main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Roulette',
    component: Roulette,
  },
  {
    path: '/faq',
    name: 'FaQ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/faq/main.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to) => {
  Vue.nextTick(() => {
    document.title = `${Vue.prototype.$config.name} - ${to.name}`;
  });
});

export default router;
