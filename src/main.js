import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';

import axios from 'axios';
import VueAxios from 'vue-axios';

import routes from './routes';


Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode:'history',
  routes:routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
