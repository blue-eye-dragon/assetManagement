<template>
    <div>
        <template v-for="(item) in menuData">
            <el-submenu v-if="item.children&&item.children.length>0" :key="item.id" :index="item.id + ''">
                <template slot="title">
                  <i :class="`el-icon-${item.icon}`"></i>
                  <span slot="title">{{item.title}}</span>
                </template>
                <MenuTree :menuData="item.children"></MenuTree> 
            </el-submenu>
            <el-menu-item v-else :key="item.id" :index="item.id+''" @click="selectAsideList(item)">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
  export default {
    props: ['menuData'],
    name: 'MenuTree',
    data() {
      return {
        
      }
    },
    methods: {
        
      selectAsideList (item) {

        this.$router.push(item.path)
        // store.commit('setmenuList', item.children)
        // if (item.route) {
        //   this.$router.push(item.route)
        // } else {
        //   this.$router.push(item.children[0].route)
        //   store.commit('setcurrenMenu', item.children[0].route)
        // }
      }
    },
  }
</script>

<style lang="less" scoped>
.el-menu-item.is-active {
  background: linear-gradient(45deg, #0176db, #00a3f4);
  color: #ffffff;
}
.el-menu-item:hover {
  background: linear-gradient(45deg, #0176db, #00a3f4);
  color: #ffffff;
}
</style>