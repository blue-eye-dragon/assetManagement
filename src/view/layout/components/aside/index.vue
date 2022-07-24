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
      <!-- <subMenu :menuData="asideList"></subMenu> -->
      <el-menu-item
        :index="item.id"
        v-for="item in asideList"
        :key="item.id"
        @click="selectAsideList(item)"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
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
        // { id: '1', title: '检测预警页面', path: '/detecteWarning' },
        { id: '1', title: '工作台', path: '/workTable', icon: 'location' },
        { id: '2', title: '疾病报告管理', path: '/patientList', icon: 'menu' },
        { id: '3', title: '统计报表', path: '/statisticalReports', icon: 'document' },
        // { id: '4', title: '患者列表', path: '', icon: 'notebook-2' },
        // { id: '5', title: '专项档案', path: '', icon: 'folder' },
        // { id: '6', title: '疾病上报', path: '', icon: 'thumb' },
        // { id: '7', title: '家医签约', path: '', icon: 'coordinate' },
        // { id: '8', title: '健康档案', path: '', icon: 'folder-opened' },
        { id: '9', title: '随访管理', path: '/visiteManage', icon: 'place' },
        // { id: '10', title: '健康教育', path: '', icon: 'reading' },
        // { id: '11', title: '转诊管理', path: '', icon: 'truck' },
        // { id: '12', title: '系统管理', path: '', icon: 'setting' },
        { 
          id: '13', 
          title: '疾病控制与管理',
          children: [
            { id: '132', title: '结核病管理', path: '/TBpatientList' },
            { id: '131', title: '精神疾病管理', path: '' },
            { id: '133', title: '麻风病管理', path: '' },
            { id: '134', title: '性传播疾病管理', path: '' },
            { id: '135', title: '结核病管理', path: '' },
            { id: '136', title: '高血压/糖尿病管理', path: '' },
          ], 
          icon: 's-ticket' },
        {
          id: '14',
          title: '双向转诊',
          children: [
            { id: '141', title: '转诊列表', path: '/referralList', },
            { id: '142', title: '上转申请', path: '', },
            { id: '143', title: '上转审核', path: '', },
            { id: '144', title: '下转申请', path: '/turnApplication', },
            { id: '145', title: '下转应答', path: '', },
          ],
          icon: 'setting'
        },
        { id: '15', title: '数据展示', path: '/bigscreen', icon: 's-data' },
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
