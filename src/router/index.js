import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import view from '@/view/view'
import line from '@/view/line'
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
    },
    {
      path: '/line',
      name: 'line',
      component: line
    }
  ]
})
