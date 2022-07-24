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
          <el-form-item
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
          label="登记号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="name1"
          label="疑似疾病分类"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name2"
          label="姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name3"
          label="性别"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="name4"
          label="证件号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name5"
          label="录入日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="name6"
          label="科室"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name7"
          label="状态"
          width="100"
        >
        </el-table-column>
        <el-table-column label="操作" :fixed="media?'right':false">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="openCases(scope.row)"
            >病历</el-button>
            <el-button
              size="mini"
              class="auditBtn"
              v-if="userType == '1'"
              @click="handleAudit(scope.row)"
            >审核</el-button>
            <el-button
              size="mini"
              class="investigatedBtn"
              style="margin-right:10px"
              v-if="userType == '2'"
              @click="handleCheck(scope.row)"
            >填报卡</el-button>
            <el-button
              size="mini"
              class="investigatedBtn"
              style="margin-right:10px"
              v-if="userType == '1'"
              @click="handleCheck(scope.row)"
            >待查</el-button>
            <el-popconfirm
              title="是否排除"
              @confirm="handleDelete(scope.row.id)"
            >
              <el-button
                size="mini"
                slot="reference"
                type="danger"
              >排除</el-button>
            </el-popconfirm>
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
    <el-drawer
      :with-header="false"
      :modal="false"
      :visible.sync="table"
      style="position:absolute;"
      z-index="99"
      size="50%"
      direction="btt"
    >
      <el-tabs
        v-model="patientActive"
        type="card"
        @tab-click="changePatient"
      >
        <el-tab-pane
          v-for="item in patientTabList"
          :key="item.value"
          :label="item.label"
          :name="item.value"
        >

        </el-tab-pane>
      </el-tabs>
    </el-drawer>
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
      media: false,
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
          value: '待报',
          label: '待报'
        },
        {
          value: '已报',
          label: '已报'
        },
        {
          value: '被审',
          label: '被审'
        },
        {
          value: '被退',
          label: '被退'
        },
        {
          value: '全部',
          label: '全部'
        }
      ],
      departmentList: [
        {
          value: '1',
          label: '神经内科'
        },
        {
          value: '2',
          label: '骨科'
        },
        {
          value: '3',
          label: '内分泌科'
        },
        {
          value: '4',
          label: '肿瘤科'
        },
      ],
      diseasesTypeList: [
        {
          label: '传染病',
          value: 1
        },
        {
          label: '慢病',
          value: 2
        },
        {
          label: '精神障碍',
          value: 3
        },
        {
          label: '食源性疾病',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      formData: [
        {
          id: 1,
          name0: '1212121',
          name1: '传染病',
          name2: '里斯',
          name3: '男',
          name4: '123111199412080075',
          name5: '202-01-03',
          name6: '神经内科',
          name7: '待处理',
        },
        {
          id: 2,
          name0: '1212121',
          name1: '慢病',
          name2: '里斯',
          name3: '男',
          name4: '123111199412080075',
          name5: '202-01-03',
          name6: '神经内科',
          name7: '已审核',
        },
        {
          id: 3,
          name0: '1212121',
          name1: '精神障碍',
          name2: '里斯',
          name3: '男',
          name4: '123111199412080075',
          name5: '202-01-03',
          name6: '神经内科',
          name7: '排除',
        },
        {
          id: 4,
          name0: '1212121',
          name1: '食源性疾病',
          name2: '里斯',
          name3: '男',
          name4: '123111199412080075',
          name5: '202-01-03',
          name6: '神经内科',
          name7: '待查',
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
  created () {
    this.bus.$on('media', item => {
      this.media = item
    })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'cardInformation',
        params: {
          flag: 'add'
        }
      })
    },
    handleAudit () {
      this.$router.push({
        name: 'cardInformation',
        params: {
          flag: 'audit'
        }
      })
    },
    handleCheck () {
      this.$router.push('/cardInformation')
    },
    changePatient () { },
    openCases (e) {
      console.log(e);
      this.table = !this.table
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