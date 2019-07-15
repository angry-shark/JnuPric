import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

import routes from './routes';
import mystore from './store';



Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.use(Vuex);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode:'history',
  routes:routes,
})

const store = new Vuex.Store(mystore);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
