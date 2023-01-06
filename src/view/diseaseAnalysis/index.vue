<template>
  <div>
    <el-row class="searchForm">
      <el-col :span="18">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="100px"
        >
          <el-form-item label="查询时间：">
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
          <el-form-item label="院区：">
            <el-select
              v-model="formInline.department"
              placeholder="请选择院区"
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
          <transition
            :duration="{ enter: 800, leave: 100 }"
            mode="out-in"
            name="el-fade-in-linear"
          >
            <div
              class="selectMode"
              v-if="!isUpDown1"
            >
                <el-form-item label="主诊断：">
                    <el-select
                    v-model="formInline.department"
                    placeholder="请选择主诊断"
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
                <el-form-item label="主操作：">
                    <el-select
                    v-model="formInline.department"
                    placeholder="请选择主操作"
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
            </div>
          </transition>
        </el-form>
      </el-col>
      <el-col :span="6" style="textAlign:right">
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
          :icon="isUpDown1?'el-icon-arrow-up':'el-icon-arrow-down'"
          @click="onUpDown1"
          class="highSearch"
        >高级查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="gridData"
              :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
            <el-table-column label="序号" fixed="left" type="index" width="50"></el-table-column>
            <el-table-column property="name1" fixed="left" label="院区"></el-table-column>
            <el-table-column label="科室" fixed="left">
              <template slot-scope="scope">
                  <a href="#" style="textDecoration:none;color: blue;fontSize: 16px;" @click="openInnerVisible(scope.row.name2)">{{scope.row.name2}}</a>
              </template>
            </el-table-column>
            <el-table-column property="name3" label="出院人次" sortable width="120"></el-table-column>
            <el-table-column property="name4" label="住院均次费用" sortable></el-table-column>
            <el-table-column property="name5" label="住院耗材均次费用" sortable></el-table-column>
            <el-table-column property="name6" label="平均耗占比" sortable width="120"></el-table-column>
            <el-table-column property="name7" label="平均CMI值" sortable width="120"></el-table-column>
            <el-table-column property="name8" label="平均使用耗材种类数" sortable></el-table-column>
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
    <el-dialog width="60%" title="科室详情" :visible.sync="innerVisible" >
        <el-dialog
            width="50%"
            title="病人详情"
            :visible.sync="innerVisible1"
            append-to-body>
            <el-dialog
                width="40%"
                title="耗材详情"
                :visible.sync="innerVisible2"
                append-to-body>
                <el-table :data="gridData3"
                                height="250"
                                :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
                          <el-table-column property="name1" label="耗材种类"></el-table-column>
                          <el-table-column property="name2" label="耗材品种" ></el-table-column>
                          <el-table-column property="name3" label="使用数量" ></el-table-column>
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
            </el-dialog>
            <el-table :data="gridData2"
                          height="250"
                          :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
                    <el-table-column property="name1" label="病人"></el-table-column>
                    <el-table-column property="name2" label="主治医师" ></el-table-column>
                    <el-table-column property="name3" label="住院医生" ></el-table-column>
                    <el-table-column property="name4" label="住院费用" ></el-table-column>
                    <el-table-column property="name5" label="耗材费用" ></el-table-column>
                    <el-table-column label="使用耗材总类数">
                      <template slot-scope="scope">
                          <a href="#" style="textDecoration:none;color: blue;fontSize: 16px;" @click="openInnerVisible2(scope.row.name6)">{{scope.row.name6}}</a>
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
        </el-dialog>
        <el-table :data="gridData1"
                      height="250"
                      :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
                <el-table-column property="name1" label="医生" width="100"></el-table-column>
                <el-table-column label="诊疗人次" width="100" sortable>
                  <template slot-scope="scope">
                      <a href="#" style="textDecoration:none;color: blue;fontSize: 16px;" @click="openInnerVisible1(scope.row.name2)">{{scope.row.name2}}</a>
                  </template>
                </el-table-column>
                <el-table-column property="name3" label="住院均次费用" ></el-table-column>
                <el-table-column property="name4" label="住院耗材均次费用" ></el-table-column>
                <el-table-column property="name5" label="人均耗占比" width="120"></el-table-column>
                <el-table-column property="name6" label="平均CMI值" width="120"></el-table-column>
                <el-table-column property="name7" label="平均使用耗材总类数" ></el-table-column>
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
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
    name: 'diseaseAnalysis',
    mixins: [mixin],
    data() {
        return {
            isUpDown: true,
            isUpDown1: true,
            activeName: 'first',
            outerVisible: false,
            innerVisible: false,
            innerVisible1: false,
            innerVisible2: false,
            formInline: {},
            pickerOptions: {
                shortcuts: [ {
                    text: '最近三个月',
                    onClick (picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - 3);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近六个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - 6);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '今年至今',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date(new Date().getFullYear(), 0);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            departmentList: [],
            gridData: [
                {
                    name1: '院区1',
                    name2: '科室1',
                    name3: '100',
                    name4: '90000.00',
                    name5: '50000.00',
                    name6: '80000.00',
                    name7: '10090',
                    name8: '10',
                },
                {
                    name1: '院区2',
                    name2: '科室2',
                    name3: '100',
                    name4: '90000.00',
                    name5: '50000.00',
                    name6: '80000.00',
                    name7: '10090',
                    name8: '10',
                },
                {
                    name1: '院区3',
                    name2: '科室3',
                    name3: '100',
                    name4: '90000.00',
                    name5: '50000.00',
                    name6: '80000.00',
                    name7: '10090',
                    name8: '10',
                },
                {
                    name1: '院区4',
                    name2: '科室4',
                    name3: '100',
                    name4: '90000.00',
                    name5: '50000.00',
                    name6: '80000.00',
                    name7: '10090',
                    name8: '10',
                },
                {
                    name1: '院区5',
                    name2: '科室5',
                    name3: '100',
                    name4: '90000.00',
                    name5: '50000.00',
                    name6: '80000.00',
                    name7: '10090',
                    name8: '10',
                },
            ],
            gridData1: [
                {
                    name1: '医生1',
                    name2: '8',
                    name3: '10000',
                    name4: '80000',
                    name5: '5000',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '医生1',
                    name2: '8',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '医生1',
                    name2: '8',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '医生1',
                    name2: '8',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '医生1',
                    name2: '8',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                }
            ],
            gridData2: [
                {
                    name1: '病人1',
                    name2: '主治医生1',
                    name3: '住院医生1',
                    name4: '12000',
                    name5: '5500',
                    name6: '21',
                },
                {
                    name1: '病人2',
                    name2: '主治医生2',
                    name3: '住院医生2',
                    name4: '12000',
                    name5: '5500',
                    name6: '21',
                },
                {
                    name1: '病人3',
                    name2: '主治医生3',
                    name3: '住院医生3',
                    name4: '12000',
                    name5: '5500',
                    name6: '21',
                },
                {
                    name1: '病人4',
                    name2: '主治医生4',
                    name3: '住院医生4',
                    name4: '12000',
                    name5: '5500',
                    name6: '21',
                },
                {
                    name1: '病人5',
                    name2: '主治医生5',
                    name3: '住院医生5',
                    name4: '12000',
                    name5: '5500',
                    name6: '21',
                },
                {
                    name1: '病人6',
                    name2: '主治医生6',
                    name3: '住院医生6',
                    name4: '12000',
                    name5: '5500',
                    name6: '21',
                }
            ],
            gridData3: [
                {
                    name1: '导管',
                    name2: '导管',
                    name3: '2',
                },
                {
                    name1: '支架',
                    name2: '支架',
                    name3: '2',
                },
                {
                    name1: '胶带',
                    name2: '胶带',
                    name3: '2',
                },
                {
                    name1: '棉布',
                    name2: '棉布',
                    name3: '2',
                },
                {
                    name1: '酒精',
                    name2: '酒精',
                    name3: '2',
                },
            ],
        }
    },
    mounted () {
    },
    methods: {
        onUpDown () {
          this.isUpDown = !this.isUpDown
        },
        onUpDown1 () {
          this.isUpDown1 = !this.isUpDown1
        },
        onSubmit () {},
        openInnerVisible () {
            this.innerVisible = !this.innerVisible
        },
        openInnerVisible1 () {
          console.log(123);
            this.innerVisible1 = !this.innerVisible1
        },
        openInnerVisible2 () {
          console.log(12333);
            this.innerVisible2 = !this.innerVisible2
        }
    }
}
</script>

<style lang="less" scoped>
    .titleBox {
        color: #000000;
        font-size: 13px;
        font-weight: 700;
    }
    .myEchartsBox {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        justify-content: space-around;
        .echartsBox {
            width: 30%;
            /deep/ .el-tabs__header {
                margin: 0;
            }
            /deep/ .el-tabs__item {
                height: 30px;
                line-height: 30px;
                font-size: 13px;
                font-weight: 700;
            }
            /deep/ .el-tabs__item:hover {
                background-color: transparent; 
                color: #409EFF; 
            }
            .echartsContent {
                width: 100%;
                padding: 20px;
                height: 250px;
            }
        }
    }
    @media screen and (max-width: 1200px) {
        .myEchartsBox {
            .echartsBox {
                width:100%
            }
        }
    }
</style>