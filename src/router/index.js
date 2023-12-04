import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Index
    }
  ]
})

export default router
