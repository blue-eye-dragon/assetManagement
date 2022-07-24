<template>
  <div>
    <div class="backBox">
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        size="mini"
        @click="back"
      >返回</el-button>
    </div>
    <el-table
      :data="formData"
      stripe
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
    >
      <el-table-column
        prop="name1"
        label="姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="name2"
        label="性别"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="name3"
        label="联系电话"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name4"
        label="是否随访"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="name5"
        label="随访日期"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="name6"
        label="随访形式"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="name7"
        label="失访原因"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="name8"
        label="随访人"
        width="120"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="auditBtn"
            @click="visiteDetail(scope.row)"
          >记录详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="com-pagination"
      @size-change="search"
      @current-change="search"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :current-page.sync="pager.page"
      :page-size.sync="pager.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
  name: 'memberlist',
  mixins: [mixin],
  data () {
    return {
      formData: [
        {
          id: 1,
          name1: '张三',
          name2: '男',
          name3: '13911113333',
          name4: '是',
          name5: '2022-03-25',
          name6: '门诊',
          name7: '--',
          name8: '周粥',
        },
        {
          id: 2,
          name1: '张三',
          name2: '男',
          name3: '13911113333',
          name4: '是',
          name5: '2022-04-25',
          name6: '家庭随访',
          name7: '--',
          name8: '周粥',
        },
        {
          id: 3,
          name1: '张三',
          name2: '男',
          name3: '13911113333',
          name4: '是',
          name5: '2022-05-25',
          name6: '电话',
          name7: '--',
          name8: '周粥',
        },
        {
          id: 4,
          name1: '张三',
          name2: '男',
          name3: '13911113333',
          name4: '否',
          name5: '2022-06-25',
          name6: '家庭随访',
          name7: '已死亡',
          name8: '周粥',
        }
      ],
    }
  },
  methods: {
    visiteDetail () {
      this.$router.push({
        name: 'visiteDetail',
        params: {
          flag: 'look'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.backBox {
  align-items: center;
  text-align: left;
  line-height: 60px;
}
.el-col {
  padding: 0 0 0 20px;
}
.searchForm {
  margin-bottom: 20px;
  border-bottom: 1px solid;
  .el-input {
    width: 200px;
  }
}
.el-drawer.btt {
  padding-top: 10px;
}
</style>