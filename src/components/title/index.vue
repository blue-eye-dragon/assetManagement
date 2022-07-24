<template>
  <div class="titleBox">
    <span class="titleIcon"></span> {{titleName}}
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
    line-height: 40px;
    display: flex;
    align-items: center;
}
.titleIcon {
  display: inline-block;
  margin-right: 10px;
  height: 15px;
  width: 4px;
  background-color: #409eff;
}
</style>