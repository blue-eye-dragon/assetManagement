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
              v-if="!isUpDown"
            >
                <el-form-item label="供应商：">
                    <el-select
                    v-model="formInline.department"
                    placeholder="请选择供应商"
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
          :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'"
          @click="onUpDown"
          class="highSearch"
        >高级查询</el-button>
      </el-col>
    </el-row>
    <el-row class="myEchartsBox">
        <el-col class="echartsBox">
            <div style="width:100%;marginTop: 15px;"> 
                <titleBox titleName="供应商供货情况分析"></titleBox>
                <div style="padding:20px">
                    <el-table :data="tableData"
                              style="width:100%"
                              height="800"
                              border>
                        <el-table-column type="index" width="50" label="序号"></el-table-column>
                        <el-table-column prop="name1" label="供应商名称"></el-table-column>
                        <el-table-column prop="name2" label="供货金额" width="120"></el-table-column>
                        <el-table-column prop="name3" label="供货时间" width="180"></el-table-column>
                    </el-table>
                </div>
            </div>
        </el-col>
        <el-col class="echartsBox">
            <div style="width:100%">
                <titleBox titleName="供应商供货金额月度趋势"></titleBox>
                <div id="supplierEvaluation1" class="echartsContent"></div>
            </div>
            <div style="width:100%">
                <titleBox titleName="供应商耗材分类供应top"></titleBox>
                <div id="supplierEvaluation2" class="echartsContent"></div>
            </div>
            <div style="width:100%">
                <titleBox titleName="供应商供货时间排名"></titleBox>
                <div id="supplierEvaluation3" class="echartsContent"></div>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import mixin from '@/mixins'
import titleBox from '@/components/title/index'
var myChart1, myChart2, myChart3
export default {
    name: 'supplierEvaluationAnalysis',
    mixins: [mixin],
    components: {
        titleBox
    },
    data() {
        return {
            isUpDown: true,
            formInline: {},
            tableData: [
                {
                    id: 1,
                    name1: '供应商1',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 2,
                    name1: '供应商2',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 3,
                    name1: '供应商3',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 4,
                    name1: '供应商4',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 5,
                    name1: '供应商5',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 6,
                    name1: '供应商6',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 7,
                    name1: '供应商7',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 8,
                    name1: '供应商8',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 9,
                    name1: '供应商9',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 10,
                    name1: '供应商10',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 11,
                    name1: '供应商11',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 12,
                    name1: '供应商12',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 13,
                    name1: '供应商13',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 14,
                    name1: '供应商14',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 15,
                    name1: '供应商15',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 16,
                    name1: '供应商16',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 17,
                    name1: '供应商17',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 18,
                    name1: '供应商18',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 19,
                    name1: '供应商19',
                    name2: '100',
                    name3: '5',
                },
                {
                    id: 20,
                    name1: '供应商20',
                    name2: '100',
                    name3: '5',
                }
            ],
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
        }
    },
    mounted () {
        this.initname1()
        this.initname2()
        this.initname3()
    },
    methods: {
        onUpDown () {
          this.isUpDown = !this.isUpDown
        },
        onSubmit () {},
        initname1 () {
            if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
                myChart1.dispose(); //销毁
            }
            var chartDom = document.getElementById('supplierEvaluation1');
            myChart1 = this.$echarts.init(chartDom);
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
            option && myChart1.setOption(option);
        },
        initname2 () {
            if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                myChart2.dispose(); //销毁
            }
            var chartDom = document.getElementById('supplierEvaluation2');
            myChart2 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
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
                    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'USA', 'India', 'China', 'World']
                },
                series: [
                    {
                    name: '2011',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230, 29034, 104970, 131744, 630230]
                    },
                ]
            };
            option && myChart2.setOption(option);
        },
        initname3 () {
            if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                myChart3.dispose(); //销毁
            }
            var chartDom = document.getElementById('supplierEvaluation3');
            myChart3 = this.$echarts.init(chartDom);
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
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
                },
                series: [
                    {
                    name: '2011',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                    name: '2012',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            };
            option && myChart3.setOption(option);
        },
    }
}
</script>

<style lang="less" scoped>
    .titleBox {
        color: #000000;
        font-size: 13px;
        font-weight: 700;
    }
    /deep/ .el-table .el-table__cell {
        height: 50px;
        border: 1px solid;
    }
    .myEchartsBox {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        justify-content: space-around;
        .echartsBox {
            width: 50%;
            .echartsContent {
                width: 100%;
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