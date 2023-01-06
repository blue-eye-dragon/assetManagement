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
        // 工作台
        {
          "path": "/workTable",
          "name": "workTable",
          "component": () => import("@/view/workTable/index.vue"),
        },
        // 耗材收入分析
        {
          "path": "/incomeAnalysis",
          "name": "incomeAnalysis",
          "component": () => import("@/view/paymentsAnalysis/incomeAnalysis/index.vue"),
        },
        // 耗材成本分析
        {
          "path": "/costAnalysis",
          "name": "costAnalysis",
          "component": () => import("@/view/paymentsAnalysis/costAnalysis/index.vue"),
        },
        // 耗材库存分析
        {
          "path": "/warehouseAnalysis",
          "name": "warehouseAnalysis",
          "component": () => import("@/view/warehouseAnalysis/index.vue"),
        },
        // 耗材入库分析
        {
          "path": "/inventoryAnalysis",
          "name": "inventoryAnalysis",
          "component": () => import("@/view/inventoryAnalysis/index.vue"),
        },

        // 耗材出库分析
        {
          "path": "/outboundAnalysis",
          "name": "outboundAnalysis",
          "component": () => import("@/view/outboundAnalysis/index.vue"),
        },

        // 高值耗材分析
        {
          "path": "/highConsumablesAnalysis",
          "name": "highConsumablesAnalysis",
          "component": () => import("@/view/highConsumablesAnalysis/index.vue"),
        },

        // 重点品规分析
        {
          "path": "/productGaugeAnalysis",
          "name": "productGaugeAnalysis",
          "component": () => import("@/view/productGaugeAnalysis/index.vue"),
        },

        // 病种分析
        {
          "path": "/diseaseAnalysis",
          "name": "diseaseAnalysis",
          "component": () => import("@/view/diseaseAnalysis/index.vue"),
        },

        // 供应商评价分析
        {
          "path": "/supplierEvaluationAnalysis",
          "name": "supplierEvaluationAnalysis",
          "component": () => import("@/view/supplierEvaluationAnalysis/index.vue"),
        },

        // 统计报表
        {
          "path": "/statisticalReports",
          "name": "statisticalReports",
          "component": () => import("@/view/statisticalReports/index.vue"),
        },

        // 统计报表
        {
          "path": "/handheldConsumablesAnalysis",
          "name": "handheldConsumablesAnalysis",
          "component": () => import("@/view/handheldConsumablesAnalysis/index.vue"),
        },
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
