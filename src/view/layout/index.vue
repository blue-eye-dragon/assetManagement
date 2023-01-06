<template id="layout">
  <el-container class="layout">
    <el-header class="headerTop">
      <div class="title">医疗资产管理平台</div>
      <el-button
        type="primary"
        :icon="`el-icon-${isCollapse?'s-unfold':'s-fold'}`"
        class="isShow"
        @click="changeShadow"
      ></el-button>
      <div style="" class="topMenuTwo">
        <span :class="topMenuTwo == 0?'topMenuActive':''" @click="topMenuTwo = 0">院长驾驶舱</span>
        <span :class="topMenuTwo == 1?'topMenuActive':''" @click="topMenuTwo = 1">耗材分析</span>
      </div>
      <div class="setting">
        <el-dropdown @command="handleCommand">
          <i
            class="el-icon-s-tools"
            style="color:#fff"
          ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container v-if="topMenuTwo == 0">
      <workTable></workTable>
    </el-container>
    <el-container class="contentBox" v-if="topMenuTwo == 1">
      <el-aside
        v-if="!media"
        :width="isCollapse?'80px':'200px'"
        class="asideMenu"
      >
        <div class="adminInfo">
          <i class="el-icon-user-solid"></i>
          <p class="adminName">{{userName}}</p>
        </div>
        <Aside class="asideMenuList"></Aside>
      </el-aside>
      <el-main>
        <tagView class="tagTop"></tagView>
        <!-- <keep-alive> -->
          <router-view class="mainBox"></router-view>
        <!-- </keep-alive> -->
      </el-main>
      <el-drawer
        v-if="media"
        :visible.sync="drawer"
        :show-close="false"
        :with-header="false"
        size="200"
        direction="ltr"
      >
        <el-aside
          :width="'200px'"
          class="asideMenu"
        >
          <div class="adminInfo">
            <i class="el-icon-user-solid"></i>
            <p class="adminName">{{userName}}</p>
          </div>
          <Aside class="asideMenuList"></Aside>
        </el-aside>
      </el-drawer>
    </el-container>
  </el-container>
</template>
<script>
import Aside from '@/view/layout/components/aside/index.vue'
import Topmenu from '@/view/layout/components/topmenu/index.vue'
import workTable from '@/view/workTable/index.vue'
import tagView from '@/view/layout/components/tagView/index.vue'
export default {
  name: 'layout',
  components: {
    Aside,
    Topmenu,
    workTable,
    tagView
  },
  data () {
    return {
      isCollapse: false,
      media: false,
      drawer: true,
      userName: '',
      upUserName: 'xxx',
      topMenuTwo: 0
    }
  },
  mounted () {
    const screenWidth = document.body.clientWidth
    if (screenWidth < 1200) {
      this.isCollapse = false
      this.media = true
    } else {
      this.isCollapse = false
      this.media = false
    }
    this.bus.$emit('collapse', this.isCollapse)
    this.bus.$emit('media', this.media)
    window.onresize = () => {
      return (() => {
        const screenWidth = document.body.clientWidth
        if (screenWidth < 1200) {
          this.isCollapse = false
          this.media = true
        } else {
          this.isCollapse = false
          this.media = false
        }
        this.bus.$emit('collapse', this.isCollapse)
        this.bus.$emit('media', this.media)
      })()
    }
  },
  methods: {
    changeShadow () {
      this.drawer = !this.drawer
      if (!this.media) {
        this.isCollapse = !this.isCollapse
        this.bus.$emit('collapse', this.isCollapse)
      }
    },
    handleCommand () {
      this.$router.push('/login')
    },
    handleClose () { }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  color: #333;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.topMenuActive {
  border: 2px solid #f8f8f8;
  border-radius: 10px;
  background-color: #4081c4;
}

.el-aside {
  // background-color: #ebebeb;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
}

.el-main {
  background-color: #e9eef3;
  position: relative;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
}
.layout {
  .headerTop {
    position: relative;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(45deg, #0176db, #00a3f4);
    .title {
      color: #ebebeb;
      font-size: 22px;
      font-weight: 550;
    }
    .layoutLogo {
      width: 160px;
      vertical-align: middle;
    }
    .topmenu {
      width: calc(100% - 350px);
      height: 60px;
      padding: 0 20px;
    }
    .topMenuTwo {
      position: absolute;
      left: 300px;
      color: #fff;
      span {
        padding: 8px;
        margin: 0 10px
      }
    }
    .setting {
      padding: 0 20px;
      i {
        font-size: 36px;
        margin-top: 12px;
      }
    }
    .isShow {
      position: absolute;
      width: 35px;
      height: 25px;
      top: 30%;
      left: 220px;
      z-index: 999;
      padding: 0;
    }
  }
  .asideMenu {
    max-width: 200px;
    position: relative;
    background-color: #daedfe;
    .adminInfo {
      padding: 20px;
      display: flex;
      justify-content: space-around;
      i {
        font-size: 40px;
      }
      .adminName {
        line-height: 40px;
      }
    }
    .asideMenuList {
      overflow-y: auto;
      display: inline-block;
      height: calc(100vh - 150px);
      // background-color: #ebebeb;
    }
    .asideMenuList::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
  .contentBox {
    .tagTop {
      z-index: 10;
      position: fixed;
      top: 60px;
      border-bottom: 1px solid;
      box-shadow: 2px 2px 3px 0 rgb(148 148 148);
    }
    .mainBox {
      overflow-x: auto;
      width: 100%;
      min-height: calc(100vh - 60px);
      padding: 10px;
      background-color: #fff;
      border: 10px solid #dad9d9;
    }
    .el-button--primary {
      color: black;
      background-color: #ebebeb;
      border-color: #ebebeb;
    }
  }
}
@media screen and (max-width: 1200px) {
  .layout {
    .headerTop {
      display: flex;
      justify-content: flex-end;
      .title {
        display: none;
      }
      .isShow {
        position: absolute;
        width: 35px;
        height: 25px;
        top: 30%;
        left: 20px;
        z-index: 999;
        padding: 0;
      }
      .topMenuTwo {
        position: absolute;
        left: 60px;
        right:100px;
        color: #fff;
        span {
          padding: 8px;
          margin: 0 10px;
          font-size: 14px;
        }
      }
    }
    .el-aside {
      color: #333;
      text-align: center;
      height: 100vh;
    }
  }
}

</style>