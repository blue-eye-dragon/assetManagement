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
        return 'height:30px!important; border-color:black!important; color:#6aaaeb!important; padding:0px!important; ; background-color:#011729'
    },
    //设置单元格背景
    cellStyle1({row, column, rowIndex, columnIndex}) {
        return 'height:30px!important; border-color:black!important; color:#6aaaeb!important; padding:0px!important; ; background-color:#001d42'
    },
  },
}
export default mixin