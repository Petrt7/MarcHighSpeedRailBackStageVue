import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/peter/employeeLoginView.vue'
import IndexView from '../views/peter/employeeIndexView.vue'
import hrmsView from '../views/peter/hrButtonView.vue'
import empListView from '../views/peter/employeeListView.vue'
import attendanceListView from '../views/peter/attendanceListView.vue'
import addEmployeeViewView from '../views/peter/addEmployeeView.vue'

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
      path: '/emp/hrms',
      name: 'hrPage',
      component: hrmsView
    },
    {
      path: '/emp/hrms/emp_list',
      name: 'empListPage',
      component: empListView
    },
    {
      path: '/emp/hrms/emp_attendance',
      name: 'attendanceListPage',
      component: attendanceListView
    },
    {
      path: '/emp/hrms/emp_add',
      name: 'addEmployeePage',
      component: addEmployeeViewView
    }
  ]
})

export default router
