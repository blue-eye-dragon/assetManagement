<template>
  <div>
    <el-row class="searchForm">
      <el-col :span="18">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="85px"
        >
          <el-form-item label="病案号">
            <el-input
              v-model="formInline.id"
              placeholder="患者姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="患者姓名">
            <el-input
              v-model="formInline.user"
              placeholder="患者姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input
              v-model="formInline.id"
              placeholder="证件号"
            ></el-input>
          </el-form-item>
          <transition
            :duration="{ enter: 800, leave: 100 }"
            mode="out-in"
            name="el-fade-in-linear"
          >
            <div
              class="selectMode"
              v-if="!isUpDown"
            >
              <el-form-item label="病种">
                <el-select
                  v-model="formInline.diseasesType"
                  placeholder="请选择"
                  style="width:200px"
                >
                  <el-option
                    v-for="item in diseasesTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input
                  v-model="formInline.iphone"
                  placeholder="联系电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="随访人">
                <el-input
                  v-model="formInline.visitPerson"
                  placeholder="随访人"
                ></el-input>
              </el-form-item>
              <el-form-item label="周期">
                <el-select
                  v-model="formInline.period"
                  placeholder="请选择"
                  style="width: 200px;"
                >
                  <el-option
                    v-for="item in periodList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="患者状态">
                <el-select
                  v-model="formInline.state"
                  placeholder="请选择"
                  style="width: 200px;"
                >
                  <el-option
                    v-for="item in stateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="随访时间">
                <el-date-picker
                  v-model="formInline.time"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </transition>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button
          size="medium"
          type="primary"
          @click="onSubmit"
        >查询</el-button>
        <el-button
          size="medium"
          type="primary"
          @click="onSubmit"
        >重置</el-button>
        <el-button
          size="medium"
          type="primary"
          :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'"
          @click="onUpDown"
          class="highSearch"
        >高级查询</el-button>
      </el-col>
    </el-row>
    <div>
      <div style="textAlign:left;marginBottom:10px">
        <el-button
          type="primary"
          @click="add"
        >新增</el-button>
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
          prop="name0"
          label="病案号"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name1"
          label="姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name2"
          label="性别"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="name3"
          label="联系电话"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name4"
          label="第二联系人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name5"
          label="病种"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="name6"
          label="患者状态"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name7"
          label="本次随访时间"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="name8"
          label="随访人"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="name9"
          label="周期"
          width="100"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="visiteDetail(scope.row)"
            >患者详情</el-button>
            <el-button
              size="mini"
              class="auditBtn"
              @click="visiteRecords(scope.row)"
            >随访记录</el-button>
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
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
  name: 'memberlist',
  mixins: [mixin],
  data () {
    return {
      table: false,
      patientActive: 1,
      userType: '1',
      patientTabList: [
        {
          label: '基本信息',
          value: 1
        },
        {
          label: '诊断信息',
          value: 2
        },
        {
          label: '医嘱信息',
          value: 3
        },
        {
          label: '影像报告',
          value: 4
        },
        {
          label: '常规检验',
          value: 5
        },
        {
          label: '微生物检验',
          value: 6
        },
        {
          label: '历史报卡',
          value: 7
        }
      ],
      stateList: [
        {
          value: '稳定',
          label: '稳定'
        },
        {
          value: '住院',
          label: '住院'
        },
        {
          value: '未知',
          label: '未知'
        },
        {
          value: '全部',
          label: '全部'
        }
      ],
      diseasesTypeList: [
        {
          label: '结核病',
          value: 1
        },
        {
          label: '高血压',
          value: 2
        },
        {
          label: '糖尿病',
          value: 3
        },
        {
          label: '精神分裂症',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      periodList: [
        {
          label: '72小时',
          value: '1'
        },
        {
          label: '一周',
          value: '2'
        },
        {
          label: '二周',
          value: '3'
        },
        {
          label: '三周',
          value: '4'
        },
        {
          label: '一个月',
          value: '5'
        }
      ],
      formData: [
        {
          id: 1,
          name0: '012345',
          name1: '张三',
          name2: '男',
          name3: '13711111111',
          name4: '13611111111',
          name5: '结核病',
          name6: '稳定',
          name7: '2022/04/10至2022/05/10',
          name8: '周粥',
          name9: '72小时',
        },
        {
          id: 2,
          name0: '012346',
          name1: '李四',
          name2: '女',
          name3: '18911111111',
          name4: '18822222222',
          name5: '高血压',
          name6: '稳定',
          name7: '2022/04/05至2022/05/02',
          name8: '周粥',
          name9: '一周',
        },
        {
          id: 3,
          name0: '012347',
          name1: '王五',
          name2: '男',
          name3: '13311111111',
          name4: '15733333333',
          name5: '糖尿病',
          name6: '未知',
          name7: '2022/04/14至2022/05/05',
          name8: '周粥',
          name9: '二周',
        },
        {
          id: 4,
          name0: '012348',
          name1: '赵六',
          name2: '男',
          name3: '13914441111',
          name4: '14612323211',
          name5: '精神分裂症',
          name6: '住院',
          name7: '2022/04/14至2022/05/28',
          name8: '周粥',
          name9: '一个月',
        }
      ],
      formInline: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  methods: {
    add () {
      this.$router.push({
        name: 'visiteDetail',
        params: {
          flag: 'add'
        }
      })
    },
    visiteRecords () {
      this.$router.push({
        name: 'visiteRecords',
      })
    },
    visiteDetail (e) {
      this.$router.push({
        name: 'patientsDetail'
      })
    }
  }
}
</script>

<style lang="less" scoped>
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