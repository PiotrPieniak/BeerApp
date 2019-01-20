import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Beers.vue';
import Brewers from './views/Brewers.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'beers',
      component: Home,
    },
    {
      path: '/brewers',
      name: 'brewers',
      component: Brewers,
    },
  ],
});
