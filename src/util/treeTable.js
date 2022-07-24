
module.exports = {
  setChildren (children, type) {
    // 编辑多个子层级
    children.map(j => {
      this.toggleSelection(j, type)
      if (j.children) {
        this.setChildren(j.children, type)
      }
    })
  },
  toggleSelection (row, select) {
    if (row) {
      this.$nextTick(() => {
        this.$refs.multipleTable && this.$refs.multipleTable.toggleRowSelection(row, select)
      })
    }
  },
    selectAll (selection) {
    console.log(selection, 'all');
    // tabledata第一层只要有在selection里面就是全选
    const isSelect = selection.some(el => {
      const tableDataIds = this.tableData.map(j => j.id)
      return tableDataIds.includes(el.id)
    })
    // tableDate第一层只要有不在selection里面就是全不选
    const isCancel = !this.tableData.every(el => {
      const selectIds = selection.map(j => j.id)
      return selectIds.includes(el.id)
    })
    console.log(isSelect, 'isSelect');
    if (isSelect) {
      selection.map(el => {
        if (el.children) {
          // el.children.map(j => {
          //     this.toggleSelection(j, true)
          // })
          // 解决子组件没有被勾选到
          this.setChildren(el.children, true)
        }
      })
    }
    if (isCancel) {
      this.tableData.map(el => {
        if (el.children) {
          // el.children.map(j => {
          //     this.toggleSelection(j, false)
          // })
          // 解决子组件没有被勾选到
          this.setChildren(el.children, false)
        }
      })
    }
  },
    // 选中父节点时，子节点一起选中取消
    select (selection, row) {
    if (selection.some(el => { return row.id === el.id })) {
      if (row.children) {
        // row.children.map(j => {
        //     this.toggleSelection(j, true)
        // })
        // 解决子组件没有被勾选到
        this.setChildren(row.children, true)
      }
    } else {
      if (row.children) {
        // row.children.map(j => {
        //     this.toggleSelection(j, false)
        // })
        this.setChildren(row.children, false)
      }
    }
  }
}
