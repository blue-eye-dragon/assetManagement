import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/view/login/index')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/view/layout/index.vue'),
      meta: {
        title: '底层layout'
      },
      children: [
        // 慢病上报子模块
        // 工作台
        {
          "path": "/workTable",
          "name": "workTable",
          "component": () => import("@/view/workTable/index.vue"),
        },
        // 疾病报告管理
        {
          "path": "/patientList",
          "name": "patientList",
          "component": () => import("@/view/patientList/index.vue"),
        },
        // 统计报表
        {
          "path": "/statisticalReports",
          "name": "statisticalReports",
          "component": () => import("@/view/statisticalReports/index.vue"),
        },
        // 卡片详情
        {
          "path": "/cardInformation",
          "name": "cardInformation",
          "component": () => import("@/view/cardInformation/index.vue"),
        },

        //  随访管理子模块
        // 随访管理
        {
          "path": "/visiteManage",
          "name": "visiteManage",
          "component": () => import("@/view/visiteManage/index.vue"),
        },
        // 患者详情
        {
          "path": "/patientsDetail",
          "name": "patientsDetail",
          "component": () => import("@/view/visiteManage/patientsDetail/index.vue"),
        },
        // 随访记录
        {
          "path": "/visiteDetail",
          "name": "visiteDetail",
          "component": () => import("@/view/visiteManage/visiteDetail/index.vue"),
        },
        // 随访详情
        {
          "path": "/visiteRecords",
          "name": "visiteRecords",
          "component": () => import("@/view/visiteManage/visiteRecords/index.vue"),
        },

        // 结核病子模块
        // 结核病患者列表
        {
          "path": "/TBpatientList",
          "name": "TBpatientList",
          "component": () => import("@/view/TBpatientList/index.vue"),
        },
        // 结核病患者详情
        {
          "path": "/TBpatientDetail",
          "name": "TBpatientDetail",
          "component": () => import("@/view/TBpatientList/TBpatientDetail/index.vue"),
        },

        // 双向转诊
        // 转诊列表
        {
          "path": "/referralList",
          "name": "referralList",
          "component": () => import("@/view/dualLateral/referralList/index.vue"),
        },
        // 下转申请
        {
          "path": "/turnApplication",
          "name": "turnApplication",
          "component": () => import("@/view/dualLateral/turnApplication/index.vue"),
        },

        // 数据大屏
        // 下转申请
        {
          "path": "/bigscreen",
          "name": "bigscreen",
          "component": () => import("@/view/bigscreen/index.vue"),
        },

        // 社区信息维护
        // {
        //   "path": "/communityMaintain",
        //   "name": "communityMaintain",
        //   "component": () => import("@/view/backManagement/communityMaintain/index.vue"),
        // }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userName = localStorage.getItem("userName");
  console.log(userName, 123);
  if (to.name !== 'Login' && !userName) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

export default router
