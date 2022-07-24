<template>
  <div class="tagView" v-if="tagList.length">
    <div class="tagListBox">
      <div v-for="(item,index) in tagList" :key="item.id" :class="[{active: item.id === currenMenu},'tagListItem']" @click="selectAsideList(item)">
        {{item.title}}
        <span  v-if="tagList.length > 1" class="el-icon-close delIcon" @click.prevent.stop="closeSelectedTag(item,index)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '@/store'
export default {
  name: 'tag-view',
  data() {
    return {
    }
  },
  computed: {
    // 
    ...mapGetters(['tagList','currenMenu']),
  },
  mounted(){},
  methods: {
    selectAsideList (item) {
      // this.$router.push(item.path)
      store.commit('setmenuList', item.children)
      store.commit('setcurrenMenuTitle', item.title)
      if (item.path) {
        this.$router.push(item.path)
        store.commit('setcurrenMenu', item.id)
      } else {
        this.$router.push(item.children[0].path)
        store.commit('setcurrenMenu', item.children[0].id)
      }
    },
    closeSelectedTag (item, index) {
      if (index == this.tagList.length - 1) (
        this.$router.push(this.tagList[index - 1].path),
        store.commit('setcurrenMenu', this.tagList[index - 1].id)
      )
      console.log(index,this.tagList.length);
      store.commit('deltagList', item)
    }
  },
}
</script>

<style lang="less" scoped>
.tagView {
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  padding: 5px 10px;
  height: 35px;
  .tagListBox {
    display: flex;
    height: 100%;
    .tagListItem {
      height: 100%;
      font-size: 12px;
      line-height: 23px;
      white-space: nowrap;
      padding: 0 10px;
      margin: 0 5px;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #d8dce5;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      .delIcon {
        padding: 2px;
        border-radius: 50%;
        &:hover {
          cursor: pointer;
          color: #ffffff;
          background-color: #b4bccc;
        }
      }
      &.active {
        color: #fff;
        background-color: #017fe0;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>