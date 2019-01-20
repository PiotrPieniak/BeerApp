/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'

Vue.use(VueRouter);

Vue.config.productionTip = true;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
