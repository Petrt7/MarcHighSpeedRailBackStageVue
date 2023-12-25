import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/peter/employeeLoginView.vue'
import IndexView from '../views/peter/employeeIndexView.vue'
import hrmsView from '../views/peter/hrButtonView.vue'
import empListView from '../views/peter/employeeListView.vue'
import attendanceListView from '../views/peter/attendanceListView.vue'
import addEmployeeView from '../views/peter/addEmployeeView.vue'
import employeeDataView from '../views/peter/employeeDataView.vue'
import authorListView from '../views/peter/authorityManagementListView.vue'
import employeeAuthorEditView from '../views/peter/authorityManagementEmployeeEditView.vue'
import departmentAuthorEditView from '../views/peter/authorityManagementDepartmentEditView.vue'
import addEmpSystemAuthorView from '../views/peter/addEmployeeSystemAuthorView.vue'
import addDeptSystemAuthorView from '../views/peter/addDepartmentSystemAuthorView.vue'
import leaveApplyView from '../views/peter/employeeLeaveApplyView.vue'
import leaveAuditView from '../views/peter/leaveAuditView.vue'
import carryForwardListView from '../views/peter/carryForwardList.vue'
import errorView from '../views/peter/401ErrorView.vue'
import employeeAccountListView from '../views/peter/employeeAccountListView.vue'
import employeePasswordEditView from '../views/peter/employeePasswordEditView.vue'

// marc back stage component
import trainBackStage from '../views/marc/train.vue'
import railRouteBackStage from '../views/marc/railRoute.vue'
import ticketDiscountBackStage from '../views/marc/ticketDiscount.vue'
import scheduleTemplateBackStage from '../views/marc/scheduleTemplate.vue'
import implScheduleTemplate from '../views/marc/implScheduleTemplate.vue'
import searchScheudle from '../views/marc/searchSchedule.vue'
import scheduleRestSeat from '../views/marc/scheduleRestSeat.vue'
import sluicegate from '../views/marc/sluicegate.vue'
// wowowork back stage component
import lostAdd from '../views/wowowork/lostAdd.vue'
import lostAll from '../views/wowowork/lostAll.vue'
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
    },
    {
      path: '/emp/author/list',
      name: 'authorListPage',
      component: authorListView
    },
    {
      path: '/emp/author/emp/edit',
      name: 'employeeAuthorEditPage',
      component: employeeAuthorEditView
    },
    {
      path: '/emp/author/dept/edit',
      name: 'departmentAuthorEditPage',
      component: departmentAuthorEditView
    },
    {
      path: '/emp/author/emp/add',
      name: 'addEmpSystemAuthorPage',
      component: addEmpSystemAuthorView
    },
    {
      path: '/emp/author/dept/add',
      name: 'addDeptSystemAuthorPage',
      component: addDeptSystemAuthorView
    },
    {
      path: '/emp/leave/apply',
      name: 'leaveApplyPage',
      component: leaveApplyView
    },
    {
      path: '/emp/leave/audit',
      name: 'leaveAuditPage',
      component: leaveAuditView
    },
    {
      path: '/emp/carry-forward/list',
      name: 'carryForwardListPage',
      component: carryForwardListView
    },
    {
      path: '/error',
      name: 'errorPage',
      component: errorView
    }, {
      path: '/schedule/train',
      component: trainBackStage
    },
    {
      path: '/schedule/railRoute',
      component: railRouteBackStage
    },
    {
      path: '/schedule/ticketDiscount',
      component: ticketDiscountBackStage,
    },
    {
      path: '/schedule/scheduleTemplate',
      component: scheduleTemplateBackStage,
    },
    {
      path: '/schedule/implScheduleTemplate/:schtid',
      component: implScheduleTemplate,
      props: true
    },
    {
      path: '/schedule/searchSchedule',
      component: searchScheudle,
    },
    {
      path: '/schedule/scheduleRestSeat/:schid',
      component: scheduleRestSeat,
      props: true

    },
    {
      path: '/ticket/sluicegate',
      component: sluicegate,
    },
    {
      path: '/lostParadise/lostAdd',
      component: lostAdd,

    },
    {
      path: '/emp/acc/list',
      name: 'employeeAccountListPage',
      component: employeeAccountListView
    },
    {
      path: '/emp/psw/edit',
      name: 'employeePasswordEditPage',
      component: employeePasswordEditView,
      path: '/lostParadise/lostAll',
      component: lostAll,

    }
  ]
})

export default router
