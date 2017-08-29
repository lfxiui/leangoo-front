import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ProFile from '@/components/user/profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/profile',
      name:'ProFile',
      component:ProFile
    }
  ]
})
