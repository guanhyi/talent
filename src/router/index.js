import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import talent from '@/view/talent'
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
      path: '/talent',
      name: 'talent',
      component: talent
    }
  ]
})
