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
          <el-form-item label="科室">
            <el-select
              v-model="formInline.department"
              placeholder="请选择"
            >
              <el-option
                v-for="item in departmentList"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申报时间">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item
            label="疑似疾病分类"
            label-width="120px"
          >
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
          </el-form-item> -->
          <!-- <transition
            :duration="{ enter: 800, leave: 100 }"
            mode="out-in"
            name="el-fade-in-linear"
          >
            <div
              class="selectMode"
              v-if="!isUpDown"
            >
              <el-form-item label="科室">
                <el-select
                  v-model="formInline.department"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="当前状态">
                <el-select
                  v-model="formInline.state"
                  placeholder="请选择"
                  style="width: 205px;"
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
              <el-form-item label="申报时间">
                <el-date-picker
                  v-model="formInline.time"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </transition> -->
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
        <!-- <el-button
          size="medium"
          type="primary"
          :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'"
          @click="onUpDown"
          class="highSearch"
        >高级查询</el-button> -->
      </el-col>
    </el-row>
    <div style="textAlign:right;marginBottom:10px">
      <el-button type="primary">导出</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      max-height="600"
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
    >
      <el-table-column
        prop="department"
        label="科室"
      >
      </el-table-column>
      <el-table-column
        prop="rateOfReport"
        label="上报率"
      >
      </el-table-column>
      <el-table-column
        prop="rateOfNoReport"
        label="漏报率"
      >
      </el-table-column>
      <el-table-column
        prop="allNumber"
        label="总人数"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
  name: 'statisticalReports',
  mixins: [mixin],
  data () {
    return {
      diseasesTypeList: [],
      departmentList: [],
      stateList: [],
      departmentList: [
        {
          label: '神经内科',
          value: '1'
        },
        {
          label: '消化科',
          value: '2'
        },
        {
          label: '血液科',
          value: '3'
        },
        {
          label: '肾内科',
          value: '4'
        },
        {
          label: '内分泌科',
          value: '5'
        },
        {
          label: '神经外科',
          value: '6'
        },
        {
          label: '肿瘤科',
          value: '7'
        },
        {
          label: '普外科',
          value: '8'
        },
        {
          label: '泌尿外科',
          value: '9'
        },
        {
          label: '心胸外科',
          value: '10'
        },
        {
          label: '肿瘤放疗科',
          value: '11'
        },
        {
          label: '产科',
          value: '12'
        },
        {
          label: '中医科',
          value: '13'
        },
        {
          label: '口腔科',
          value: '14'
        }
      ],
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
      formInline: {
        user: '',
        id: '',
        diseasesType: ''
      },
      tableData: [
        {
          department: '神经内科',
          rateOfReport: '95%',
          rateOfNoReport: '3%',
          allNumber: '233'
        },
        {
          department: '消化科',
          rateOfReport: '78%',
          rateOfNoReport: '13%',
          allNumber: '400'
        },
        {
          department: '血液科',
          rateOfReport: '89%',
          rateOfNoReport: '4%',
          allNumber: '455'
        },
        {
          department: '肾内科',
          rateOfReport: '94%',
          rateOfNoReport: '6%',
          allNumber: '577'
        },
        {
          department: '内分泌科',
          rateOfReport: '85%',
          rateOfNoReport: '3%',
          allNumber: '605'
        },
        {
          department: '神经外科',
          rateOfReport: '92%',
          rateOfNoReport: '7%',
          allNumber: '498'
        },
        {
          department: '肿瘤科',
          rateOfReport: '92%',
          rateOfNoReport: '7%',
          allNumber: '748'
        },
        {
          department: '普外科',
          rateOfReport: '84%',
          rateOfNoReport: '4%',
          allNumber: '189'
        },
        {
          department: '泌尿外科',
          rateOfReport: '78%',
          rateOfNoReport: '9%',
          allNumber: '199'
        },
        {
          department: '心胸外科',
          rateOfReport: '89%',
          rateOfNoReport: '8%',
          allNumber: '987'
        },
        {
          department: '肿瘤放疗科',
          rateOfReport: '87%',
          rateOfNoReport: '7%',
          allNumber: '876'
        },
        {
          department: '产科',
          rateOfReport: '87%',
          rateOfNoReport: '6%',
          allNumber: '876'
        },
        {
          department: '中医科',
          rateOfReport: '79%',
          rateOfNoReport: '5%',
          allNumber: '654'
        },
        {
          department: '口腔科',
          rateOfReport: '87%',
          rateOfNoReport: '7%',
          allNumber: '748'
        }
      ]
    }
  },
  methods: {
  },
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
</style>