// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from './store/'
Vue.config.productionTip = false;


import './config/rem'
import _ from 'lodash'
Vue.prototype._ = _;

import  { AlertPlugin } from 'vux'
import  { ToastPlugin } from 'vux'
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
