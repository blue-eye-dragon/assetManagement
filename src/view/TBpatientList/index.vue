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
          <el-form-item label="案例号">
            <el-input
              v-model="formInline.id"
              placeholder="患者姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
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
              <el-form-item label="服药卡号">
                <el-input
                  v-model="formInline.id"
                  placeholder="服药卡号"
                ></el-input>
              </el-form-item>
              <el-form-item label="当前状态">
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
              <el-form-item label="首诊断单位">
                <el-select
                  v-model="formInline.department"
                  placeholder="请选择"
                  style="width: 200px;"
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
              <el-form-item label="督导单位">
                <el-select
                  v-model="formInline.department"
                  placeholder="请选择"
                  style="width: 200px;"
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
              <el-form-item label="登记时间">
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
        height="400"
        style="width: 100%"
        :cell-style="cellStyle"
        :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
      >
        <el-table-column
          prop="name0"
          label="登记号"
          width="120"
          :fixed="!media"
        >
        </el-table-column>
        <el-table-column
          prop="name1"
          label="姓名"
          width="120"
          :fixed="!media"
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
          label="年龄"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="name4"
          label="证件号后六位"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name5"
          label="联系方式"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name6"
          label="首诊断单位"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name7"
          label="现管理单位"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name8"
          label="督导单位"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name9"
          label="登记日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="name10"
          label="登记分类"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name11"
          label="诊断结果"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name12"
          label="管理方式"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name13"
          label="始治日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="name14"
          label="服药状态"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name15"
          label="有无实验室数据"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
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
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
  name: 'TBpatientList',
  mixins: [mixin],
  data () {
    return {
      table: false,
      patientActive: 1,
      userType: '1',
      media: false,
      stateList: [
        {
          value: '治疗结束',
          label: '治疗结束'
        },
        {
          value: '服药异常',
          label: '服药异常'
        },
        {
          value: '不良反应',
          label: '不良反应'
        }
      ],
      formData: [
        {
          id: 1,
          name0: '440303008-2021-02131',
          name1: '里斯',
          name2: '男',
          name3: '67',
          name4: '080075',
          name5: '13813331333',
          name6: '罗湖区慢病院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '病原学检查阴性',
          name12: '全程督导',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
        {
          id: 2,
          name0: '440303008-2021-02321',
          name1: '程珊珊',
          name2: '女',
          name3: '45',
          name4: '216075',
          name5: '13813331333',
          name6: '罗湖区慢病院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '病原学检查阴性',
          name12: '智能工具辅助管理',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
        {
          id: 3,
          name0: '440303008-2021-02321',
          name1: '干梦凡',
          name2: '男',
          name3: '67',
          name4: '080075',
          name5: '13813331333',
          name6: '深圳市第三人民医院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '仪分子生物学阳性',
          name12: '全程督导',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
        {
          id: 4,
          name0: '440303008-2021-02321',
          name1: '达和泰',
          name2: '男',
          name3: '37',
          name4: '080075',
          name5: '13813331333',
          name6: '罗湖区慢病院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '病原学检查阴性',
          name12: '全程督导',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
        {
          id: 5,
          name0: '440303008-2021-02321',
          name1: '星笑寒',
          name2: '男',
          name3: '41',
          name4: '080075',
          name5: '13813331333',
          name6: '罗湖区慢病院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '病原学检查阴性',
          name12: '全程督导',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
        {
          id: 6,
          name0: '440303008-2021-02321',
          name1: '逮雅容',
          name2: '男',
          name3: '51',
          name4: '080075',
          name5: '13813331333',
          name6: '罗湖区慢病院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '病原学检查阴性',
          name12: '全程督导',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
        {
          id: 7,
          name0: '440303008-2021-02321',
          name1: '唐初柳',
          name2: '男',
          name3: '24',
          name4: '080075',
          name5: '13813331333',
          name6: '罗湖区慢病院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '病原学检查阴性',
          name12: '全程督导',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
        {
          id: 8,
          name0: '440303008-2021-02321',
          name1: '琴寻雪',
          name2: '男',
          name3: '61',
          name4: '080075',
          name5: '13813331333',
          name6: '罗湖区慢病院',
          name7: '罗湖区慢病院',
          name8: '湖贝社区健康服务中心',
          name9: '2021-09-08',
          name10: '新患者',
          name11: '病原学检查阴性',
          name12: '全程督导',
          name13: '2021-09-08',
          name14: '服药正常',
          name15: '无',
        },
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
        name: 'TBpatientDetail',
        params: {
          flag: 'add'
        }
      })
    },
    lookDetail () {
      this.$router.push({
        name: 'TBpatientDetail',
        params: {
          flag: 'look'
        }
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