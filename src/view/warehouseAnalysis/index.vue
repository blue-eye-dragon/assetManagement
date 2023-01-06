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
          <!-- <el-form-item label="科室名称：">
            <el-select
              v-model="formInline.department"
              placeholder="请选择科室"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <transition
            :duration="{ enter: 800, leave: 100 }"
            mode="out-in"
            name="el-fade-in-linear"
          >
            <div
              class="selectMode"
              v-if="!isUpDown"
            >
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
        <!-- <el-button
          size="medium"
          type="primary"
          :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'"
          @click="onUpDown"
          class="highSearch"
        >高级查询</el-button> -->
      </el-col>
    </el-row>
    <cardType :cardList="cardList"></cardType>
    <div class="myEchartsBox">
        <div class="echartsBox">
          <titleBox titleName="耗材库存"></titleBox>
          <div id="warehouse1" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材库存占比"></titleBox>
          <div id="warehouse2" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材库存占比（二级分类）"></titleBox>
          <div id="warehouse3" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="卫生材料库存结余" name="first">
                <div id="warehouse4" class="echartsContent"></div>
              </el-tab-pane>
              <el-tab-pane label="低值消耗品库存" name="second">
                <div id="warehouse5" class="echartsContent"></div>
              </el-tab-pane>
          </el-tabs>
        </div>
        <div class="echartsBox">
          <titleBox titleName="卫生材料库存占比"></titleBox>
          <div id="warehouse6" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="卫生材料库存趋势"></titleBox>
          <div id="warehouse7" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材库存分布"></titleBox>
          <div id="warehouse8" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材库存TOP10"></titleBox>
          <div id="warehouse9" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材增长率TOP10"></titleBox>
          <div id="warehouse10" class="echartsContent"></div>
        </div>
    </div>
    <titleBox titleName="耗材库存汇总统计分析"></titleBox>
    <el-table :data="gridData"
              :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
            <el-table-column label="科室名称" fixed="left">
              <template slot-scope="scope">
                  <a href="#" style="textDecoration:none;color: blue;fontSize: 16px;" @click="openInnerVisible(scope.row.name1)">{{scope.row.name1}}</a>
              </template>
            </el-table-column>
            <el-table-column property="name2" label="科室收入" sortable></el-table-column>
            <el-table-column property="name3" label="本期" sortable></el-table-column>
            <el-table-column property="name4" label="同期" sortable></el-table-column>
            <el-table-column property="name5" label="增长率" sortable></el-table-column>
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
    <el-dialog width="60%" title="耗材库存明细" :visible.sync="innerVisible" append-to-body>
            <el-row class="searchForm">
              <el-col :span="16">
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
                  <transition
                    :duration="{ enter: 800, leave: 100 }"
                    mode="out-in"
                    name="el-fade-in-linear"
                  >
                    <div
                      class="selectMode"
                      v-if="!isUpDown"
                    >
                      <el-form-item label="耗材名称：">
                        <el-input v-model="formInline.department" placeholder="请输入内容"></el-input>
                      </el-form-item>
                      <el-form-item label="耗材类型：">
                        <el-select
                          v-model="formInline.department"
                          placeholder="请选择耗材类型"
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
                      <el-form-item label="供应商定位：">
                        <el-select
                          v-model="formInline.department"
                          placeholder="请选择耗材类型"
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
              <el-col :span="8">
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
            <el-table :data="gridData1"
                    :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
                <el-table-column property="name1" label="仓库名称" width="150" fixed="left"></el-table-column>
                <el-table-column property="name2" label="耗材类别" width="120"></el-table-column>
                <el-table-column property="name3" label="耗材编码" width="100" sortable></el-table-column>
                <el-table-column property="name4" label="耗材名称" width="100"></el-table-column>
                <el-table-column property="name5" label="规格型号" width="100" sortable></el-table-column>
                <el-table-column property="name6" label="单价" width="100" sortable></el-table-column>
                <el-table-column property="name7" label="周转率" width="100" sortable></el-table-column>
                <el-table-column property="name8" label="结存数量" width="100" sortable></el-table-column>
                <el-table-column property="name9" label="结存金额" width="100" sortable></el-table-column>
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
import cardType from '@/components/cardType/index'
import titleBox from '@/components/title/index'
var myChart1, myChart2, myChart3, myChart4, myChart5, myChart6, myChart7, myChart8, myChart9, myChart10
export default {
    name: 'warehouseAnalysis',
    mixins: [mixin],
    components: {
        cardType,
        titleBox
    },
    data() {
        return {
            isUpDown: true,
            activeName: 'first',
            outerVisible: false,
            innerVisible: false,
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
            cardList: [
                {
                    id: 1,
                    title: '耗材总库存',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 2,
                    title: '一般卫生材料总库存',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 3,
                    title: '低值易耗品总库存',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
            ],
            departmentList: [],
            gridData: [
                {
                    name1: '静脉注射器',
                    name2: '655001000.00',
                    name3: '201011100.00',
                    name4: '90001200.00',
                    name5: '2300000000.00',
                },
                {
                    name1: '静脉注射器',
                    name2: '655001000.00',
                    name3: '201011100.00',
                    name4: '90001200.00',
                    name5: '2300000000.00',
                },
                {
                    name1: '静脉注射器',
                    name2: '655001000.00',
                    name3: '201011100.00',
                    name4: '90001200.00',
                    name5: '2300000000.00',
                },
                {
                    name1: '静脉注射器',
                    name2: '655001000.00',
                    name3: '201011100.00',
                    name4: '90001200.00',
                    name5: '2300000000.00',
                }
            ],
            gridData1: [
                {
                    name1: '物资设备仓库',
                    name2: '医用材料',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '物资设备仓库',
                    name2: '医用材料',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '物资设备仓库',
                    name2: '医用材料',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '物资设备仓库',
                    name2: '医用材料',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                },
                {
                    
                    name1: '物资设备仓库',
                    name2: '医用材料',
                    name3: '10000',
                    name4: '一次性使用输液器',
                    name5: 'O4-N',
                    name6: '7.14',
                    name7: '10',
                    name8: '9000',
                    name9: '30000',
                }
            ],
        }
    },
    mounted () {
        this.bus.$on('collapse', item => {
            setTimeout(() => {
                this.initname1()
                this.initname2()
                this.initname3()
                this.initname4()
                this.initname5()
                this.initname6()
                this.initname7()
                this.initname8()
                this.initname9()
                this.initname10()
            })
        })
        this.initname1()
        this.initname2()
        this.initname3()
        this.initname4()
        this.initname5()
        this.initname6()
        this.initname7()
        this.initname8()
        this.initname9()
        this.initname10()
    },
    methods: {
        onUpDown () {
          this.isUpDown = !this.isUpDown
        },
        onSubmit () {},
        handleClick (tab) {
            this.$nextTick(()=>{
                if (tab.name == 'first') {
                    this.initname4()
                }
                if (tab.name == 'second') {
                    this.initname5()
                }
            })
        },
        openInnerVisible (item) {
            console.log(item);
            this.innerVisible = true
        },
        initname1 () {
            if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
                myChart1.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse1');
            myChart1 = this.$echarts.init(chartDom);
            var option = {
                legend: {
                  data: ['结余', '出库', '入库']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  top: '15%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'value'
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    axisTick: {
                      show: false
                    },
                    data: ['无菌注射器', '袋式输液器', '抽血器材', '血浆分离器', '静脉留置针', '医用导管', '导尿包']
                  }
                ],
                series: [
                  {
                    name: '结余',
                    type: 'bar',
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                  },
                  {
                    name: '入库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                  },
                  {
                    name: '出库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true,
                      position: 'left'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                  }
                ]
            };
            option && myChart1.setOption(option);
        },
        initname2 () {
            if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                myChart2.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse2');
            myChart2 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '43%',
                    containLabel: true
                },
                series: [
                    {
                        name: '耗材库存占比',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: '收费' },
                            { value: 735, name: '不收费' },
                        ]
                    }
                ]
            };
            option && myChart2.setOption(option);
        },
        initname3 () {
            if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                myChart3.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse3');
            myChart3 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'top'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '40%',
                    containLabel: true
                },
                series: [
                    {
                    name: '耗材成本构成',
                    type: 'pie',
                    radius: [30, 60],
                    center: ['50%', '60%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 40, name: '中性笔' },
                        { value: 38, name: '档案盒' },
                        { value: 32, name: 'A4纸' },
                        { value: 30, name: '计算器' },
                        { value: 28, name: '会议记录本' },
                        { value: 26, name: '长尾夹' },
                    ]
                    }
                ]
            };
            option && myChart3.setOption(option);
        },
        initname4 () {
            if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
                myChart4.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse4');
            myChart4 = this.$echarts.init(chartDom);
            var option = {
                legend: {
                  data: ['结余', '出库', '入库']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  top: '15%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'value'
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    axisTick: {
                      show: false
                    },
                    data: ['无菌注射器', '袋式输液器', '抽血器材', '血浆分离器', '静脉留置针', '医用导管', '导尿包']
                  }
                ],
                series: [
                  {
                    name: '结余',
                    type: 'bar',
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                  },
                  {
                    name: '入库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                  },
                  {
                    name: '出库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true,
                      position: 'left'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                  }
                ]
            };
            option && myChart4.setOption(option);
        },
        initname5 () {
            if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
                myChart5.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse5');
            myChart5 = this.$echarts.init(chartDom);
            var option = {
                legend: {
                  data: ['结余', '出库', '入库']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  top: '15%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'value'
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    axisTick: {
                      show: false
                    },
                    data: ['无菌注射器', '袋式输液器', '抽血器材', '血浆分离器', '静脉留置针', '医用导管', '导尿包']
                  }
                ],
                series: [
                  {
                    name: '结余',
                    type: 'bar',
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                  },
                  {
                    name: '入库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                  },
                  {
                    name: '出库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true,
                      position: 'left'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                  }
                ]
            };
            option && myChart5.setOption(option);
        },
        initname6 () {
            if (myChart6 != null && myChart6 != "" && myChart6 != undefined) {
                myChart6.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse6');
            myChart6 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'top'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '40%',
                    containLabel: true
                },
                series: [
                    {
                    name: '耗材成本构成',
                    type: 'pie',
                    radius: [30, 60],
                    center: ['50%', '60%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 40, name: '中性笔' },
                        { value: 38, name: '档案盒' },
                        { value: 32, name: 'A4纸' },
                        { value: 30, name: '计算器' },
                        { value: 28, name: '会议记录本' },
                    ]
                    }
                ]
            };
            option && myChart6.setOption(option);
        },
        initname7 () {
            if (myChart7 != null && myChart7 != "" && myChart7 != undefined) {
                myChart7.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse7');
            myChart7 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    data: ['本期', '同期', '增长率']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '30%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            inside: false,
                            interval:0,  
                            formatter: function(value) {
                                return value.split("").join("\n")
                            },
                            textStyle: {
                                fontSize:'8',
                                itemSize:''
                                
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '金额（万元）',
                        min: 0,
                        max: 10000,
                        interval: 2000,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '增长率（%）',
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '本期',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + ' 万元';
                            }
                        },
                        data: [
                            200, 500, 1200, 800, 2500, 4900, 3500, 5499, 7800, 4321, 1341, 6100
                        ]
                    },
                    {
                        name: '同期',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + '万元';
                            }
                        },
                        data: [
                            400, 600, 4200, 1500, 3500, 5900, 2500, 4499, 6800, 3321, 2341, 4100
                        ]
                    },
                    {
                        name: '增长率',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + '%';
                            }
                        },
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };
            option && myChart7.setOption(option);
        },
        initname8 () {
            if (myChart8 != null && myChart8 != "" && myChart8 != undefined) {
                myChart8.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse8');
            myChart8 = this.$echarts.init(chartDom);
            var option = {
                legend: {
                  data: ['结余', '出库', '入库']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  top: '15%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'value'
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    axisTick: {
                      show: false
                    },
                    data: ['无菌注射器', '袋式输液器', '抽血器材', '血浆分离器', '静脉留置针', '医用导管', '导尿包']
                  }
                ],
                series: [
                  {
                    name: '结余',
                    type: 'bar',
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                  },
                  {
                    name: '入库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                  },
                  {
                    name: '出库',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true,
                      position: 'left'
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                  }
                ]
            };
            option && myChart8.setOption(option);
        },
        initname9 () {
            if (myChart9 != null && myChart9 != "" && myChart9 != undefined) {
                myChart9.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse9');
            myChart9 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '20%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        inside: false,
                        interval:0,  
                        rotate: 40,
                    },
                },
                yAxis: {
                    type: 'category',
                    data: ['无菌注射器', '袋式输液器', '抽血器材', '血浆分离器', '静脉留置针', '医用导管']
                },
                series: [
                    {
                        name: '本期',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: '同期',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    },
                    {
                        name: '增长率',
                        type: 'line',
                        data: [29325, 23438, 41000, 221594, 234141, 781807]
                    }
                ]
            };
            option && myChart9.setOption(option);
        },
        initname10 () {
            if (myChart10 != null && myChart10 != "" && myChart10 != undefined) {
                myChart10.dispose(); //销毁
            }
            var chartDom = document.getElementById('warehouse10');
            myChart10 = this.$echarts.init(chartDom);
            var option = {
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['中性笔', '档案盒', '牛皮纸袋', 'A4纸', '复写纸', '计算器', '铅笔', '橡皮', '硬皮本']
                },
                series: [
                    {
                        name: '2011',
                        type: 'bar',
                        data: [100, 182, 200, 234, 290, 300, 630, 1049, 1314],
                    },
                ]
            };
            option && myChart10.setOption(option);
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