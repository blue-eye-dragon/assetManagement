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
                <el-form-item label="科室：">
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
                </el-form-item>
                <el-form-item label="耗材类别：">
                    <el-select
                    v-model="formInline.department"
                    placeholder="请选择耗材类别"
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
                <el-form-item label="术式：">
                    <el-select
                    v-model="formInline.department"
                    placeholder="请选择术式"
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
    <div class="myEchartsBox">
        <div class="echartsBox">
          <titleBox titleName="高值耗材使用金额园区占比"></titleBox>
          <div id="highConsumables1" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="高值耗材使用趋势"></titleBox>
          <div id="highConsumables2" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="高值耗材使用TOP10"></titleBox>
          <div id="highConsumables3" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="高值耗材科室领用情况TOP"></titleBox>
          <div id="highConsumables4" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="高值耗材使用趋势"></titleBox>
          <div id="highConsumables5" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="高值耗材使用TOP10"></titleBox>
          <div id="highConsumables6" class="echartsContent"></div>
        </div>
        <div style="width:100%;display:flex;padding: 0 20px;flex-wrap: wrap;">
            <div class="tableTwo">
                <titleBox titleName="高值耗材术式用量分析"></titleBox>
                <el-table :data="tableData"
                        style="width: 100%">
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column property="data1" label="术式" width="120"></el-table-column>
                    <el-table-column property="data2" label="耗材" width="120"></el-table-column>
                    <el-table-column property="data3" label="总用量" width="120"></el-table-column>
                    <el-table-column property="data4" label="术式平均用量" width="120"></el-table-column>
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
            <div class="tableTwo">
                <titleBox titleName="医生术式耗材用量分析"></titleBox>
                <el-table :data="tableData1"
                        style="width: 100%">
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column property="data1" label="术式" width="120"></el-table-column>
                    <el-table-column property="data2" label="医生" width="120"></el-table-column>
                    <el-table-column property="data3" label="耗材" width="120"></el-table-column>
                    <el-table-column property="data4" label="医生平均用量" width="120"></el-table-column>
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
    </div>
  </div>
</template>

<script>
import titleBox from '@/components/title/index'
import mixin from '@/mixins'
var myChart1, myChart2, myChart3, myChart4, myChart5, myChart6, myChart7, myChart8, myChart9, myChart10
export default {
    name: 'highConsumablesAnalysis',
    mixins: [mixin],
    components: {
        titleBox
    },
    data() {
        return {
            isUpDown: true,
            isUpDown1: true,
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
            departmentList: [],
            tableData: [
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
                },
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
                },
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
                },
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
                }
            ],
            tableData1: [
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
                },
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
                },
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
                },
                {
                    data1: '静脉注射器',
                    data2: '655001000.00',
                    data3: '201011100.00',
                    data4: '90001200.00',
                    data5: '2300000000.00',
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
            })
        })
        this.initname1()
        this.initname2()
        this.initname3()
        this.initname4()
        this.initname5()
        this.initname6()
    },
    methods: {
        onUpDown () {
          this.isUpDown = !this.isUpDown
        },
        onUpDown1 () {
          this.isUpDown1 = !this.isUpDown1
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
            var chartDom = document.getElementById('highConsumables1');
            myChart1 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {},
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: '40%',
                    data: [
                        { value: 1048, name: '院区1' },
                        { value: 735, name: '院区2' },
                        { value: 580, name: '院区3' },
                        { value: 484, name: '院区4' },
                        { value: 300, name: '院区5' }
                    ],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            };
            option && myChart1.setOption(option);
        },
        initname2 () {
            if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                myChart2.dispose(); //销毁
            }
            var chartDom = document.getElementById('highConsumables2');
            myChart2 = this.$echarts.init(chartDom);
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
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '20%',
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
                yAxis: {
                    type: 'value',
                    name: '金额（万元）',
                    min: 0,
                    max: 10000,
                    interval: 2000,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: {
                    name: '本期',
                    type: 'line',
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' 万元';
                        }
                    },
                    data: [
                        200, 500, 1200, 800, 2500, 4900, 3500, 5499, 7800, 4321, 1341, 6100
                    ]
                }
            };
            option && myChart2.setOption(option);
        },
        initname3 () {
            if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                myChart3.dispose(); //销毁
            }
            var chartDom = document.getElementById('highConsumables3');
            myChart3 = this.$echarts.init(chartDom);
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
                    data: ['本期', '同期']
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
                    }
                ]
            };
            option && myChart3.setOption(option);
        },
        initname4 () {
            if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
                myChart4.dispose(); //销毁
            }
            var chartDom = document.getElementById('highConsumables4');
            myChart4 = this.$echarts.init(chartDom);
            var option = {
                legend: {
                    data: ['领用数量', '领用金额']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '15%',
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
                        name: '领用数量',
                        type: 'bar',
                        data: [100, 182, 200, 234, 290, 300, 630, 1049, 1314],
                    },
                    {
                        name: '领用金额',
                        type: 'bar',
                        data: [100, 182, 190, 214, 230, 250, 510, 749, 1114],
                    },
                ]
            };
            option && myChart4.setOption(option);
        },
        initname5 () {
            if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
                myChart5.dispose(); //销毁
            }
            var chartDom = document.getElementById('highConsumables5');
            myChart5 = this.$echarts.init(chartDom);
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
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '20%',
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
                yAxis: {
                    type: 'value',
                    name: '金额（万元）',
                    min: 0,
                    max: 10000,
                    interval: 2000,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: {
                    name: '本期',
                    type: 'line',
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' 万元';
                        }
                    },
                    data: [
                        200, 500, 1200, 800, 2500, 4900, 3500, 5499, 7800, 4321, 1341, 6100
                    ]
                }
            };
            option && myChart5.setOption(option);
        },
        initname6 () {
            if (myChart6 != null && myChart6 != "" && myChart6 != undefined) {
                myChart6.dispose(); //销毁
            }
            var chartDom = document.getElementById('highConsumables6');
            myChart6 = this.$echarts.init(chartDom);
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
                    data: ['本期', '同期']
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
                    }
                ]
            };
            option && myChart6.setOption(option);
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
        .tableTwo {
            width: 50%;
            padding:0 20px
        }
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
            .tableTwo {
                width: 100%;
                padding: 0;
            }
        }
    }
</style>