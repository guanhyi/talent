// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/store.js'
import 'babel-polyfill'
import VueAreaLinkage from 'vue-area-linkage'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.use(VueAreaLinkage)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) { // 需要登录的页面
    if (store.state.bAuth) { // 已登录
      next() // 访问下一个页面
    } else { // 未登录
      alert('请先登录')
      next('/Login') // 回到登录界面
    }
  } else {
    next()
  }
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
