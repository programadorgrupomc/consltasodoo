import { createRouter, createWebHistory } from 'vue-router'
import PageUno from '../views/PageUno.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PageUno
  },
  {
    path: '/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormInd.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormEmp.vue')
  },
  {
    path: '/page2',
    name: 'page2',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageDos.vue')
  },
  {
    path: '/page3',
    name: 'page3',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageTres.vue')
  },
  {
    path: '/customerpro',
    name: 'customerpro',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormEmpPro.vue')
  },
  {
    path: '/personpro',
    name: 'personpro',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormIndPro.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
