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
          <titleBox titleName="耗材收入趋势分析"></titleBox>
          <div id="income1" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="耗材收入构成"></titleBox>
          <div id="income2" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
            <div style="height:30px"></div>
          <div id="income3" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="门诊住院耗材收入占比"></titleBox>
          <div id="income4" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="构成（门诊）"></titleBox>
          <div id="income5" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="趋势（门诊）"></titleBox>
          <div id="income6" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="门诊耗材收入"></titleBox>
          <div id="income7" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="门诊次均耗材收入"></titleBox>
          <div id="income8" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="门诊收入增长率，门诊人次增长率，门诊耗材增长率对比分析"></titleBox>
          <div id="income9" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="住院耗材收入"></titleBox>
          <div id="income10" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="住院次均耗材收入"></titleBox>
          <div id="income11" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="住院收入增长率，住院人次增长率，住院耗材增长率对比分析"></titleBox>
          <div id="income12" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="高值耗材总收入"></titleBox>
          <div id="income13" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="告知耗材总收入占比"></titleBox>
          <div id="income14" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="高值耗材收入TOP10"></titleBox>
          <div id="income15" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="百元医疗收入消耗卫生材料"></titleBox>
          <div id="income16" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <titleBox titleName="收费耗材收支对比"></titleBox>
          <div id="income17" class="echartsContent"></div>
        </div>
        <div class="echartsBox">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="科室收支差额TOP10" name="first">
                <div id="income18" class="echartsContent"></div>
              </el-tab-pane>
              <el-tab-pane label="科室耗占比TOP10" name="second">
                <div id="income19" class="echartsContent"></div>
              </el-tab-pane>
          </el-tabs>
        </div>
    </div>
    <el-dialog title="科室耗材成本明细" :visible.sync="outerVisible" class="innerVisibleTable" width="70%">
        <el-dialog width="60%" title="耗材收入明细" :visible.sync="innerVisible" append-to-body>
            <el-table :data="gridData1"
                    :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
                <el-table-column property="name1" label="科室名称" width="150" fixed="left"></el-table-column>
                <el-table-column property="name2" label="科室收入" width="120" sortable></el-table-column>
                <el-table-column label="耗材收入">
                    <el-table-column property="name3" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name4" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name5" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="耗占比">
                    <el-table-column property="name6" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name7" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name8" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="门诊耗占比">
                    <el-table-column property="name9" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name10" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name11" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="住院耗占比">
                    <el-table-column property="name12" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name13" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name14" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="收费耗材领用金额">
                    <el-table-column property="name15" label="本期" width="100" sortable></el-table-column>
                    <el-table-column property="name16" label="同期" width="100" sortable></el-table-column>
                    <el-table-column property="name17" label="增长率" width="100" sortable></el-table-column>
                </el-table-column>
                <el-table-column label="收费耗材支配比">
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
        </el-dialog>
        <el-table :data="gridData"
                  :header-cell-style="{textAlign:'center',fontSize:'14px',height:'20px'}">
            <el-table-column label="科室名称" width="150" fixed="left">
                <template slot-scope="scope">
                    <a href="#" style="textDecoration:none;color: blue;fontSize: 16px;" @click="openInnerVisible(scope.row.name1)">{{scope.row.name1}}</a>
                </template>
            </el-table-column>
            <el-table-column property="name2" label="科室收入" width="120" sortable></el-table-column>
            <el-table-column label="耗材收入">
                <el-table-column property="name3" label="本期" width="100" sortable></el-table-column>
                <el-table-column property="name4" label="同期" width="100" sortable></el-table-column>
                <el-table-column property="name5" label="增长率" width="100" sortable></el-table-column>
            </el-table-column>
            <el-table-column label="耗占比">
                <el-table-column property="name6" label="本期" width="100" sortable></el-table-column>
                <el-table-column property="name7" label="同期" width="100" sortable></el-table-column>
                <el-table-column property="name8" label="增长率" width="100" sortable></el-table-column>
            </el-table-column>
            <el-table-column label="门诊耗占比">
                <el-table-column property="name9" label="本期" width="100" sortable></el-table-column>
                <el-table-column property="name10" label="同期" width="100" sortable></el-table-column>
                <el-table-column property="name11" label="增长率" width="100" sortable></el-table-column>
            </el-table-column>
            <el-table-column label="住院耗占比">
                <el-table-column property="name12" label="本期" width="100" sortable></el-table-column>
                <el-table-column property="name13" label="同期" width="100" sortable></el-table-column>
                <el-table-column property="name14" label="增长率" width="100" sortable></el-table-column>
            </el-table-column>
            <el-table-column label="收费耗材领用金额">
                <el-table-column property="name15" label="本期" width="100" sortable></el-table-column>
                <el-table-column property="name16" label="同期" width="100" sortable></el-table-column>
                <el-table-column property="name17" label="增长率" width="100" sortable></el-table-column>
            </el-table-column>
            <el-table-column label="收费耗材支配比">
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
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/mixins'
import cardType from '@/components/cardType/index'
import titleBox from '@/components/title/index'
var myChart1, myChart2, myChart3, myChart4, myChart5, myChart6, myChart7, myChart8, myChart9, myChart10, myChart11, myChart12, myChart13, myChart14, myChart15, myChart16, myChart17, myChart18, myChart19
export default {
    name: 'incomeAnalysis',
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
                    title: '耗材总收入',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 2,
                    title: '高值耗材收入',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 3,
                    title: '耗占比',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 4,
                    title: '门诊耗占比',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                },
                {
                    id: 5,
                    title: '住院耗占比',
                    num1: 30000,
                    num2: 20000,
                    num3: '35%'
                }
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
                this.initname7()
                this.initname8()
                this.initname9()
                this.initname10()
                this.initname11()
                this.initname12()
                this.initname13()
                this.initname14()
                this.initname15()
                this.initname16()
                this.initname17()
                this.initname18()
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
        this.initname11()
        this.initname12()
        this.initname13()
        this.initname14()
        this.initname15()
        this.initname16()
        this.initname17()
        this.initname18()
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
            var chartDom = document.getElementById('income1');
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
            option && myChart1.setOption(option);
        },
        initname2 () {
            if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                myChart2.dispose(); //销毁
            }
            var chartDom = document.getElementById('income2');
            myChart2 = this.$echarts.init(chartDom);
            var option = {
                title: {
                    text: '卫生材料收入',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '35%',
                    containLabel: true
                },
                series: [
                    {
                    name: '卫生材料收入',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '创面损伤' },
                        { value: 735, name: '功能敷料' },
                        { value: 580, name: '生物材料' },
                        { value: 484, name: '手术用品' },
                        { value: 300, name: '粘贴材料' }
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
            option && myChart2.setOption(option);
        },
        initname3 () {
            if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                myChart3.dispose(); //销毁
            }
            var chartDom = document.getElementById('income3');
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
            var chartDom = document.getElementById('income4');
            myChart4 = this.$echarts.init(chartDom);
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
                        name: '耗材收入占比',
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
                            { value: 1048, name: '住院' },
                            { value: 735, name: '门诊' },
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
            var chartDom = document.getElementById('income5');
            myChart5 = this.$echarts.init(chartDom);
            var option = {
                title: {
                    text: '卫生材料收入',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '35%',
                    containLabel: true
                },
                series: [
                    {
                    name: '卫生材料收入',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '创面损伤' },
                        { value: 735, name: '功能敷料' },
                        { value: 580, name: '生物材料' },
                        { value: 484, name: '手术用品' },
                        { value: 300, name: '粘贴材料' }
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
            option && myChart5.setOption(option);
        },
        initname6 () {
            if (myChart6 != null && myChart6 != "" && myChart6 != undefined) {
                myChart6.dispose(); //销毁
            }
            var chartDom = document.getElementById('income6');
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
            option && myChart6.setOption(option);
        },
        initname7 () {
            if (myChart7 != null && myChart7 != "" && myChart7 != undefined) {
                myChart7.dispose(); //销毁
            }
            var chartDom = document.getElementById('income7');
            myChart7 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['门诊收入', '门诊耗材收入']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
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
                    name: '金额（万元）',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                    name: '门诊收入',
                    type: 'line',
                    stack: 'Total',
                    data: [2120, 1132, 2101, 3134, 2190, 1230, 4210, 1000, 4200, 6400, 3410, 2512]
                    },
                    {
                    name: '门诊耗材收入',
                    type: 'line',
                    stack: 'Total',
                    data: [1220, 782, 1191, 2234, 1290, 630, 2310, 410, 2200, 4400, 2410, 1512]
                    }
                ]
            };
            option && myChart7.setOption(option);
        },
        initname8 () {
            if (myChart8 != null && myChart8 != "" && myChart8 != undefined) {
                myChart8.dispose(); //销毁
            }
            var chartDom = document.getElementById('income8');
            myChart8 = this.$echarts.init(chartDom);
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
            option && myChart8.setOption(option);
        },
        initname9 () {
            if (myChart9 != null && myChart9 != "" && myChart9 != undefined) {
                myChart9.dispose(); //销毁
            }
            var chartDom = document.getElementById('income9');
            myChart9 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['门诊收入', '门诊耗材收入']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
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
                    name: '金额（万元）',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                    name: '门诊收入',
                    type: 'line',
                    stack: 'Total',
                    data: [2120, 1132, 2101, 3134, 2190, 1230, 4210, 1000, 4200, 6400, 3410, 2512]
                    },
                    {
                    name: '门诊耗材收入',
                    type: 'line',
                    stack: 'Total',
                    data: [1220, 782, 1191, 2234, 1290, 630, 2310, 410, 2200, 4400, 2410, 1512]
                    }
                ]
            };
            option && myChart9.setOption(option);
        },
        initname10 () {
            if (myChart10 != null && myChart10 != "" && myChart10 != undefined) {
                myChart10.dispose(); //销毁
            }
            var chartDom = document.getElementById('income10');
            myChart10 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['门诊收入', '门诊耗材收入']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
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
                    name: '金额（万元）',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                    name: '门诊收入',
                    type: 'line',
                    stack: 'Total',
                    data: [2120, 1132, 2101, 3134, 2190, 1230, 4210, 1000, 4200, 6400, 3410, 2512]
                    },
                    {
                    name: '门诊耗材收入',
                    type: 'line',
                    stack: 'Total',
                    data: [1220, 782, 1191, 2234, 1290, 630, 2310, 410, 2200, 4400, 2410, 1512]
                    }
                ]
            };
            option && myChart10.setOption(option);
        },
        initname11 () {
            if (myChart11 != null && myChart11 != "" && myChart11 != undefined) {
                myChart11.dispose(); //销毁
            }
            var chartDom = document.getElementById('income11');
            myChart11 = this.$echarts.init(chartDom);
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
            option && myChart11.setOption(option);
        },
        initname12 () {
            if (myChart12 != null && myChart12 != "" && myChart12 != undefined) {
                myChart12.dispose(); //销毁
            }
            var chartDom = document.getElementById('income12');
            myChart12 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['门诊收入', '门诊耗材收入']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
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
                    name: '金额（万元）',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                    name: '门诊收入',
                    type: 'line',
                    stack: 'Total',
                    data: [2120, 1132, 2101, 3134, 2190, 1230, 4210, 1000, 4200, 6400, 3410, 2512]
                    },
                    {
                    name: '门诊耗材收入',
                    type: 'line',
                    stack: 'Total',
                    data: [1220, 782, 1191, 2234, 1290, 630, 2310, 410, 2200, 4400, 2410, 1512]
                    }
                ]
            };
            option && myChart12.setOption(option);
        },
        initname13 () {
            if (myChart13 != null && myChart13 != "" && myChart13 != undefined) {
                myChart13.dispose(); //销毁
            }
            var chartDom = document.getElementById('income13');
            myChart13 = this.$echarts.init(chartDom);
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
            option && myChart13.setOption(option);
        },
        initname14 () {
            if (myChart14 != null && myChart14 != "" && myChart14 != undefined) {
                myChart14.dispose(); //销毁
            }
            var chartDom = document.getElementById('income14');
            myChart14 = this.$echarts.init(chartDom);
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '35%',
                    containLabel: true
                },
                series: [
                    {
                    name: '卫生材料收入',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '创面损伤' },
                        { value: 735, name: '功能敷料' },
                        { value: 580, name: '生物材料' },
                        { value: 484, name: '手术用品' },
                        { value: 300, name: '粘贴材料' }
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
            option && myChart14.setOption(option);
        },
        initname15 () {
            if (myChart15 != null && myChart15 != "" && myChart15 != undefined) {
                myChart15.dispose(); //销毁
            }
            var chartDom = document.getElementById('income15');
            myChart15 = this.$echarts.init(chartDom);
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
                    data: ['内科', '胸外科', '神经科', '泌尿科', '呼吸科', '肾病内科']
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
            option && myChart15.setOption(option);
        },
        initname16 () {
            if (myChart16 != null && myChart16 != "" && myChart16 != undefined) {
                myChart16.dispose(); //销毁
            }
            var chartDom = document.getElementById('income16');
            myChart16 = this.$echarts.init(chartDom);
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
            option && myChart16.setOption(option);
        },
        initname17 () {
            const that = this
            if (myChart17 != null && myChart17 != "" && myChart17 != undefined) {
                myChart17.dispose(); //销毁
            }
            var chartDom = document.getElementById('income17');
            myChart17 = this.$echarts.init(chartDom);
            myChart17.on('click', function (params) {
                console.log(params.name)
                console.log(1);
                that.outerVisible = true
            })
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
                    data: ['内科', '胸外科', '神经科', '泌尿科', '呼吸科', '肾病内科']
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
                ]
            };
            option && myChart17.setOption(option);
        },
        initname18 () {
            if (myChart18 != null && myChart18 != "" && myChart18 != undefined) {
                myChart18.dispose(); //销毁
            }
            var chartDom = document.getElementById('income18');
            myChart18 = this.$echarts.init(chartDom);
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
                    data: ['内科', '胸外科', '神经科', '泌尿科', '呼吸科', '肾病内科']
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
            option && myChart18.setOption(option);
        },
        initname19 () {
            if (myChart19 != null && myChart19 != "" && myChart19 != undefined) {
                myChart19.dispose(); //销毁
            }
            var chartDom = document.getElementById('income19');
            myChart19 = this.$echarts.init(chartDom);
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
                    data: ['内科', '胸外科', '神经科', '泌尿科', '呼吸科', '肾病内科']
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
            option && myChart19.setOption(option);
        },
    }
}
</script>

<style lang="less" scoped>
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
            .titleBox {
                color: #000000;
                font-size: 13px;
                font-weight: 700;
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