<template>
  <div class="wrap">
    <el-menu
      :default-active="currenMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <subMenu :menuData="asideList"></subMenu>
    </el-menu>
  </div>
</template>
<script>
import subMenu from '@/components/subMenu'
import { store } from '@/store'
import { mapGetters } from 'vuex'
export default {
  name: 'Aside',
  components: {
    subMenu
  },
  data () {
    return {
      isCollapse: false,
      // asideList: store.getters['asideList']
      // menuList: store.getters['asideList'],
      asideList: [
        { 
          id: '1', 
          title: '耗材收支分析', 
          children: [
            { id: '11', title: '耗材收入分析', path: '/incomeAnalysis'},
            { id: '12', title: '耗材成本分析', path: '/costAnalysis'}
          ],
          icon: 'location' 
        },
        { id: '2', title: '耗材库存分析', path: '/warehouseAnalysis', icon: 'menu' },
        { id: '3', title: '耗材入库分析', path: '/inventoryAnalysis', icon: 'document' },
        { id: '4', title: '耗材出库分析', path: '/outboundAnalysis', icon: 'place' },
        { id: '5', title: '高值耗材分析', path: '/highConsumablesAnalysis',icon: 's-ticket' },
        { id: '6', title: '重点品规分析', path: '/productGaugeAnalysis',icon: 'setting' },
        { id: '7', title: '病种分析', path: '/diseaseAnalysis', icon: 's-data' },
        { id: '8', title: '供应商评价分析', path: '/supplierEvaluationAnalysis', icon: 's-data' },
        { id: '9', title: '统计报表', path: '/statisticalReports', icon: 's-data' }
      ],
    }
  },
  computed: {
    ...mapGetters(['currenMenu']),
  },
  created () {
    this.bus.$on('collapse', item => {
      this.isCollapse = item
    })
  },
  mounted () {
    // this.getAsideList()
    document.getElementsByClassName('el-menu-item ')[0].click()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    async getAsideList () {
      const res = await this.$post('/index/getMenu')
      this.asideList = res.data.data.menu
    },  
    selectAsideList (item) {
      // this.$router.push(item.path)
      store.commit('setmenuList', item.children)
      store.commit('setcurrenMenuTitle', item.title)
      if (item.path) {
        this.$router.push(item.path)
        store.commit('setcurrenMenu', item.id)
        store.commit('addtagList',item)
      } else {
        this.$router.push(item.children[0].path)
        store.commit('setcurrenMenu', item.children[0].id)
        store.commit('addtagList',item.children[0])
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
}
.el-menu-item.is-active {
  background: linear-gradient(45deg, #0176db, #00a3f4);
  color: #ffffff;
}
.el-menu-item:hover {
  background: linear-gradient(45deg, #0176db, #00a3f4);
  color: #ffffff;
}
</style>
