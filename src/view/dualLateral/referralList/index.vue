<template>
  <div>
    <el-tabs
      v-model="dealWithState"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="待处理"
        name="1"
      >
      </el-tab-pane>
      <el-tab-pane
        label="已处理"
        name="2"
      >
      </el-tab-pane>
      <el-table
        :data="tableData"
        stripe
        border
        height="400"
        style="width: 100%"
        :cell-style="cellStyle"
        :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
      >
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="门诊号/住院号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="firstDiagnosis"
          label="初步诊断"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="diagnosisDepartment"
          label="转诊单位"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="lookDetail(scope.row)"
            >查看</el-button>
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
    </el-tabs>
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
  name: 'referralList',
  mixins: [mixin],
  data () {
    return {
      dealWithState: '1',
      tableData: [
        {
          name: '禚元思',
          id: '123456',
          age: '68',
          gender: '女',
          firstDiagnosis: '结核病',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '牧古香',
          id: '373846',
          age: '68',
          gender: '女',
          firstDiagnosis: '结核病',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '青伟兆',
          id: '414141',
          age: '45',
          gender: '男',
          firstDiagnosis: '高血压',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '牧古香',
          id: '373846',
          age: '68',
          gender: '女',
          firstDiagnosis: '结核病',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '青伟兆',
          id: '414141',
          age: '45',
          gender: '男',
          firstDiagnosis: '高血压',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '牧古香',
          id: '373846',
          age: '68',
          gender: '女',
          firstDiagnosis: '结核病',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '青伟兆',
          id: '414141',
          age: '45',
          gender: '男',
          firstDiagnosis: '高血压',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '牧古香',
          id: '373846',
          age: '68',
          gender: '女',
          firstDiagnosis: '结核病',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '青伟兆',
          id: '414141',
          age: '45',
          gender: '男',
          firstDiagnosis: '高血压',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '青伟兆',
          id: '414141',
          age: '45',
          gender: '男',
          firstDiagnosis: '高血压',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '牧古香',
          id: '373846',
          age: '68',
          gender: '女',
          firstDiagnosis: '结核病',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        },
        {
          name: '青伟兆',
          id: '414141',
          age: '45',
          gender: '男',
          firstDiagnosis: '高血压',
          diagnosisDepartment: '珠海市香洲区翠香社区卫生服务中心'
        }
      ]
    }
  },
  methods: {
    handleClick () { }
  },
}
</script>

<style>
</style>