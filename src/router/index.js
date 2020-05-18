import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import view from '@/view/view'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/view',
      name: 'view',
      component: view
    }
  ]
})
