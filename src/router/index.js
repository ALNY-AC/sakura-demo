import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/index.vue')
  },
  {
    path: '/demo',
    component: () => import('../views/demo/index.vue'),
    children: [
      { path: 'case/list', component: () => import('../views/demo/case/list.vue') },
      { path: 'case/form', component: () => import('../views/demo/case/form.vue') },
      { path: 'case/tree', component: () => import('../views/demo/case/tree.vue') },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
