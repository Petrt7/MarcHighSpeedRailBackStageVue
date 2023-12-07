import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/peter/employeeLoginView.vue'
import IndexView from '../views/peter/employeeIndexView.vue'
import hrmsView from '../views/peter/hrButtonView.vue'
import empListView from '../views/peter/employeeListView.vue'
import attendanceListView from '../views/peter/attendanceListView.vue'
import addEmployeeView from '../views/peter/addEmployeeView.vue'
import employeeDataView from '../views/peter/employeeDataView.vue'

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
      path: '/emp/hrms/add_emp',
      name: 'addEmployeePage',
      component: addEmployeeView
    },
    {
      path: '/emp/hrms/emp_data',
      name: 'employeeDataPage',
      component: employeeDataView
    }
  ]
})

export default router
