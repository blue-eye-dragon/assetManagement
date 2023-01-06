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
          <el-form-item label="科室名称：">
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
          <titleBox titleName="耗材成本占比"></titleBox>
          <div id="costName1" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材成本趋势分析"></titleBox>
          <div id="costName2" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="每出院人次消耗卫生材料"></titleBox>
          <div id="costName3" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材成本构成"></titleBox>
          <div id="costName4" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="科室耗材领用TOP10"></titleBox>
          <div id="costName5" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="科室耗材领用明细TOP10"></titleBox>
          <div id="costName6" class="echartsContent"></div>
        </div>
    </div>
    <titleBox titleName="科室耗材领用明细TOP10"></titleBox>
    <el-table :data="gridData"
              :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
        <el-table-column label="科室名称" width="150" fixed="left">
            <template slot-scope="scope">
                <a href="#" style="textDecoration:none;color: blue;fontSize: 16px;" @click="openInnerVisible(scope.row.name1)">{{scope.row.name1}}</a>
            </template>
        </el-table-column>
        <el-table-column property="name2" label="科室收入" width="120" sortable></el-table-column>
        <el-table-column label="科室卫生材料成本">
            <el-table-column property="name3" label="本期" width="100" sortable></el-table-column>
            <el-table-column property="name4" label="同期" width="100" sortable></el-table-column>
            <el-table-column property="name5" label="增长率" width="100" sortable></el-table-column>
        </el-table-column>
        <el-table-column label="一般卫生材料成本">
            <el-table-column property="name6" label="本期" width="100" sortable></el-table-column>
            <el-table-column property="name7" label="同期" width="100" sortable></el-table-column>
            <el-table-column property="name8" label="增长率" width="100" sortable></el-table-column>
        </el-table-column>
        <el-table-column label="高值耗材成本">
            <el-table-column property="name9" label="本期" width="100" sortable></el-table-column>
            <el-table-column property="name10" label="同期" width="100" sortable></el-table-column>
            <el-table-column property="name11" label="增长率" width="100" sortable></el-table-column>
        </el-table-column>
        <el-table-column label="收费耗材成本">
            <el-table-column property="name12" label="本期" width="100" sortable></el-table-column>
            <el-table-column property="name13" label="同期" width="100" sortable></el-table-column>
            <el-table-column property="name14" label="增长率" width="100" sortable></el-table-column>
        </el-table-column>
        <el-table-column label="不收费耗材成本">
            <el-table-column property="name15" label="本期" width="100" sortable></el-table-column>
            <el-table-column property="name16" label="同期" width="100" sortable></el-table-column>
            <el-table-column property="name17" label="增长率" width="100" sortable></el-table-column>
        </el-table-column>
        <el-table-column label="办公司用品成本">
            <el-table-column property="name18" label="本期" width="100" sortable></el-table-column>
            <el-table-column property="name19" label="同期" width="100" sortable></el-table-column>
            <el-table-column property="name20" label="增长率" width="100" sortable></el-table-column>
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
    <el-dialog width="60%" title="耗材收入明细" :visible.sync="innerVisible" append-to-body>
            <el-table :data="gridData1"
                    :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
                <el-table-column property="name1" label="科室名称" width="150" fixed="left"></el-table-column>
                <el-table-column property="name2" label="科室收入" width="120" sortable></el-table-column>
                <el-table-column label="科室耗材总成本">
                    <el-table-column property="name3" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name4" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name5" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="低值卫生材料成本">
                    <el-table-column property="name6" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name7" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name8" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="高值耗材成本">
                    <el-table-column property="name9" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name10" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name11" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="收费材料成本">
                    <el-table-column property="name12" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name13" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name14" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="不收费材料成本">
                    <el-table-column property="name15" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name16" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name17" label="增长率" width="100" sortable></el-table-column>
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
  </div>
</template>

<script>
import mixin from '@/mixins'
import cardType from '@/components/cardType/index'
import titleBox from '@/components/title/index'
var myChart1, myChart2, myChart3, myChart4, myChart5, myChart6
export default {
    name: 'costAnalysis',
    mixins: [mixin],
    components: {
        cardType,
        titleBox
    },
    data() {
        return {
            isUpDown: false,
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
                    title: '耗材总成本',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 2,
                    title: '高值耗材成本',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 3,
                    title: '收费耗材成本',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 4,
                    title: '不收费耗材成本',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
            ],
            departmentList: [],
            gridData: [
                {
                    name1: '内科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '脑瘤科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '胸外科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '精神科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '肾内科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                }
            ],
            gridData1: [
                {
                    name1: '内科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '内科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '内科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '内科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
                },
                {
                    name1: '内科',
                    name2: '65500',
                    name3: '10000',
                    name4: '9000',
                    name5: '10%',
                    name6: '10000',
                    name7: '9000',
                    name8: '10%',
                    name9: '10000',
                    name10: '9000',
                    name11: '10%',
                    name12: '10000',
                    name13: '9000',
                    name14: '10%',
                    name15: '10000',
                    name16: '9000',
                    name17: '10%',
                    name18: '10000',
                    name19: '9000',
                    name20: '10%',
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
        onSubmit () {},
        handleClick (tab) {
            this.$nextTick(()=>{
                if (tab.name == 'first') {
                    this.initname18()
                }
                if (tab.name == 'second') {
                    this.initname19()
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
            var chartDom = document.getElementById('costName1');
            myChart1 = this.$echarts.init(chartDom);
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
                        name: '耗材成本占比',
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
            option && myChart1.setOption(option);
        },
        initname2 () {
            if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                myChart2.dispose(); //销毁
            }
            var chartDom = document.getElementById('costName2');
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
                legend: {
                    data: ['本期耗材收入', '同期耗材收入', '增长率']
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
                        name: '本期耗材收入',
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
                        name: '同期耗材收入',
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
            option && myChart2.setOption(option);
        },
        initname3 () {
            if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                myChart3.dispose(); //销毁
            }
            var chartDom = document.getElementById('costName3');
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
                    data: ['本期耗材收入', '同期耗材收入', '增长率']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '43%',
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
                        name: '本期耗材收入',
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
                        name: '同期耗材收入',
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
            option && myChart3.setOption(option);
        },
        initname4 () {
            if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
                myChart4.dispose(); //销毁
            }
            var chartDom = document.getElementById('costName4');
            myChart4 = this.$echarts.init(chartDom);
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
                    radius: [0, 60],
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
            option && myChart4.setOption(option);
        },
        initname5 () {
            if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
                myChart5.dispose(); //销毁
            }
            var chartDom = document.getElementById('costName5');
            myChart5 = this.$echarts.init(chartDom);
            var option = {
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['内科', '胸外科', '泌尿科', '肾内科', '精神科', '呼吸科', '消化内科']
                },
                series: [
                    {
                        name: '中性笔',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '档案盒',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '计算器',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '会议记录本',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '订书机',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            option && myChart5.setOption(option);
        },
        initname6 () {
            if (myChart6 != null && myChart6 != "" && myChart6 != undefined) {
                myChart6.dispose(); //销毁
            }
            var chartDom = document.getElementById('costName6');
            myChart6 = this.$echarts.init(chartDom);
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