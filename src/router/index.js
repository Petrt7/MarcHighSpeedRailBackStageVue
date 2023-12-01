import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/peter/employeeLoginView.vue'
import IndexView from '../views/peter/employeeIndexView.vue'
import hrView from '../views/peter/hrButtonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/emp/index',
      name: 'index',
      component: IndexView
    },
    {
      path: '/emp/hr',
      name: 'hrPage',
      component: hrView
    },
  ]
})

export default router
