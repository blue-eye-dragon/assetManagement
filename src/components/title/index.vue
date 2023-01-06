<template>
  <div class="titleBox">
    <div style="display: flex;align-items: center;">
      <span class="titleIcon"></span> {{titleName}}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'titleBox',
  props: {
    titleName: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="less" scoped>
.titleBox {
    line-height: 30px;
    color: #6aaaeb;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .titleIcon {
      display: inline-block;
      margin-right: 10px;
      height: 15px;
      width: 4px;
      background-color: #409eff;
    }
}
</style>