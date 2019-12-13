// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

import './assets/css/reset.css'
import 'animate.css'
import axios from 'axios'
Vue.prototype.$axios = axios

import Filter from './filter'
for (let i in Filter) {
  Vue.filter(i, Filter[i])
}

import component from './component'
for (let i in component) {
  Vue.component(i, component[i])
}


//全局守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
    return
  }
  if (!localStorage.getItem("login_name")) {
    next('/login')
  }
  next()
})


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
