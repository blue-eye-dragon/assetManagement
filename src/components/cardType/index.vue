<template>

  <div class="typeCardList">
    <div
      v-for="(item,index) in cardList"
      :key="item.title1"
      :class="`typeCard color${index}`"
    >
      <p class="titleBox">
        <span></span>
        {{item.title}}
      </p>
      <div class="contentBox">
        <div>
            <p>{{item.num1}}</p>
            <div class="contentBoxBot">
              <div>
                同期值：<span>{{item.num2}}</span>
              </div>
              <div>
                增长率：<span>{{item.num3}}</span>
              </div>
            </div>
        </div>
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
    // width: calc(19% - 14px);
    flex: 1;
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
      p {
        font-size: 24px;
        text-align: center;
        line-height: 45px;
      }
      .contentBoxBot {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        span {
          font-size: 16px;
        }
      }
    }
  }
}

@media screen and (max-width:1200px) {
  .typeCardList .typeCard {
    width: calc(100% - 60px);
    flex: auto;
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