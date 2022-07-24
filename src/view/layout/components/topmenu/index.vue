<template>
  <div id="topmenu">
    <el-menu
      v-if="!media"
      :default-active="currenMenu"
      :active="currenMenu"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#ffffff"
      active-text-color="#f1f3f4"
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.id"
        :index="item.id"
        @click="selectAsideList(item)"
      >{{item.title}}</el-menu-item>
    </el-menu>

    <el-menu
      v-else
      :default-active="currenMenu"
      :active="currenMenu"
      class="el-menu-demo"
      mode="horizontal"
      background-color=""
      text-color="black"
      active-text-color="#f1f3f4"
    >
      <el-submenu index='1' v-if="menuList">
        <template slot="title">{{currenMenuTitle}}</template>
        <el-menu-item
          v-for="item in menuList"
          :key="item.id"
          :index="item.id"
          @click="selectAsideList(item)"
        >{{item.title}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="1" v-else style="color:#ffffff">{{currenMenuTitle}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { store } from '@/store'
import { mapGetters } from 'vuex'
export default {
  name: 'topmenu',
  data () {
    return {
      currenMenu1: '',
      media: false,
    }
  },
  computed: {
    ...mapGetters(['menuList', 'currenMenu', 'currenMenuTitle']),
    // currenMenu1 () {
    //   return this.currenMenu
    // }
  },
  created () {
    this.bus.$on('media', item => {
      this.media = item
    })
  },
  mounted () {

  },
  methods: {
    selectAsideList (item) {
      this.$router.push(item.path)
      store.commit('setcurrenMenu', item.id)
      store.commit('addtagList',item)
    },
  },
}
</script>
<style lang="less" scoped>
#topmenu {
  position: absolute;
  left: 300px;
  color: #ffffff;
}
.el-menu {
  background-color: transparent;
}
.el-menu-item.is-active {
  background-color: #0062a1;
  color: #ffffff;
}
.el-menu-item:hover {
  background-color: #0062a1;
  color: #ffffff;
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, 
.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
 /deep/.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  background-color: #0062a1;
  color: #ffffff;
} 
.el-submenu__title:hover {
  background-color: #0062a1;
}
.el-submenu__title:focus,
.el-submenu__title:hover {
  background-color: #0062a1;
}
@media screen and (max-width: 1200px) {
  #topmenu {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    color: #ffffff;
  }
}
</style>