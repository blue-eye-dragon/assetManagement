const mixin = {
  data() {
    return {
      isUpDown: true,
      total: 0,
      pager: {
        page: 1,
        limit: 10
      },
    }
  },
  methods: {
    onUpDown () {
      this.isUpDown = !this.isUpDown
    },
    onSubmit () { },
    search () {},
    handleDelete (id) {
      // console.log(id)
    },
    back () {
      this.$router.go(-1)
    },
    //设置单元格背景
    cellStyle({row, column, rowIndex, columnIndex}) {
        return 'height:35px!important; border-color:black!important; color:#000000!important; padding:0px!important; height:40px!important'
    },
  },
}
export default mixin