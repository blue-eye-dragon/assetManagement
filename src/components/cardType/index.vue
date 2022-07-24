<template>

  <div class="typeCardList">
    <div
      v-for="(item,index) in cardList"
      :key="item.title1"
      :class="`typeCard color${index}`"
    >
      <p class="titleBox">
        <span></span>
        {{item.title1}}
      </p>
      <div class="contentBox">
        <div>
          <p>待审核：<span
              :class="item.title1 == '死因监测'? null : 'hover'"
              @click="toAudit(item)"
            >{{item.toAudit}}</span>人</p>
          <p>已审核：<span
              :class="item.title1 == '死因监测'? null : 'hover'"
              @click="audited(item)"
            >{{item.audited}}</span>人</p>
          <p>超时提醒：<span
              :class="item.title1 == '死因监测'? null : 'hover'"
              @click="willExpire(item)"
            >{{item.willExpire}}</span>人</p>
        </div>
        <!-- <div>
            <img src="../../assets/传染科.png" alt="">
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/store'
export default {
  name: 'cardType',
  props: {
    cardList: {
      required: true,
      type: Array
    }
  },
  data () {
    return {

    }
  },
  methods: {
    toAudit (item) {
      if (item.title1 !== '死因监测') {
        store.commit('setcurrenMenu', item.id)
        store.commit('addtagList',item)
        store.commit('setcurrenMenuTitle', item.title2)
        this.$router.push(item.path)
      }
    },
    audited (item) {
      if (item.title1 !== '死因监测') {
        store.commit('setcurrenMenu', item.id)
        store.commit('addtagList',item)
        store.commit('setcurrenMenuTitle', item.title2)
        this.$router.push(item.path)
      }
    },
    willExpire (item) {
      if (item.title1 !== '死因监测') {
        store.commit('setcurrenMenu', item.id)
        store.commit('addtagList',item)
        store.commit('setcurrenMenuTitle', item.title2)
        this.$router.push(item.path)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.typeCardList {
  display: flex;
  flex-wrap: wrap;
  color: #ffffff;
  border-bottom: 10px solid #dad9d9;
  .typeCard {
    width: calc(16% - 14px);
    min-height: 110px;
    padding: 0 10px;
    margin: 0 10px 10px;
    border-radius: 10px;
    .titleBox {
      margin: 5px 0px;
      text-align: left;
      display: flex;
      align-items: center;
      span {
        height: 10px;
        width: 3px;
        background-color: #fff;
        margin-right: 10px;
      }
    }
    .contentBox {
      display: flex;
      margin-top: 5px;
      justify-content: space-around;
      p {
        font-size: 12px;
        text-align: right;
        span {
          cursor: pointer;
          min-width: 40px;
          display: inline-block;
          text-align: center;
          font-size: 18px;
        }
        .hover:hover {
          color: #050505;
        }
      }
    }
  }
}

@media screen and (max-width:1200px) {
  .typeCardList .typeCard {
    width: calc(100% - 60px);
  }
} 
.color0 {
  background-image: linear-gradient(to right, #ff823c, #ff9a1b);
}
.color1 {
  background-image: linear-gradient(to right, #f9bd39, #f2cc09);
}
.color2 {
  background-image: linear-gradient(to right, #476cea, #519efe);
}
.color3 {
  background-image: linear-gradient(to right, #77ad04, #79d728);
}
.color4 {
  background-image: linear-gradient(to right, #05aeee, #23b8dd);
}
.color5 {
  background-image: linear-gradient(to right, #f34c40, #ee7e76);
}
</style>