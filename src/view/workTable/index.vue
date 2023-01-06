<template>
  <div class="workTable">
    <div class="content1">
      <div class="leftBox">
        <div class="paymentsAnalysis subjectBox">
          <titleBox titleName="耗材收支分析">
            <div class="selectCycle">
              <div>日</div>
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="paymentsAnalysis">
            <div class="box">
              <div class="title">
                耗材收入
              </div>
              <div class="content">
                <div class="subBox">
                  <div>低值</div>
                  <div style="fontSize:18px;color:#0556e1">500</div>
                </div>
                <div class="subBox">
                  <div>高值</div>
                  <div style="fontSize:18px;color:#0556e1">600</div>
                </div>
                <div class="subBox">
                  <div>总收入</div>
                  <div style="fontSize:18px;color:#0556e1">1100</div>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="title">
                耗材支出
              </div>
              <div class="content">
                <div class="subBox">
                  <div>低值</div>
                  <div style="fontSize:18px;color:#0556e1">500</div>
                </div>
                <div class="subBox">
                  <div>高值</div>
                  <div style="fontSize:18px;color:#0556e1">600</div>
                </div>
                <div class="subBox">
                  <div>总收入</div>
                  <div style="fontSize:18px;color:#0556e1">1100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="warehouseAnalysis subjectBox">
          <titleBox titleName="耗材库存结存分析">
            <div class="selectCycle">
              <div>日</div>
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="warehouseAnalysis">
            <el-table :data="tableData"
                      :cell-style="cellStyle"
                      height="150px"
                      :header-cell-style="{background:'#011729',color:'#6aaaeb',borderColor:'#1b0046',fontSzie:'10px'}"
                      style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column prop="warehouse"
                               label="仓库名称">
              </el-table-column>
              <el-table-column prop="inStorage"
                               label="本期入库">
              </el-table-column>
              <el-table-column prop="outStorage"
                               label="本期出库">
              </el-table-column>
              <el-table-column prop="remaine"
                               label="库存结余">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="inventoryAmount subjectBox">
          <titleBox titleName="耗材库存结存分析">
            <div class="selectCycle">
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="inventoryAmount">
            <div class="top">
              <div class="leftBox"> 
                <div>收费耗材库存</div>
                <div>1000</div>
              </div>
              <div class="centerBox">
                <div>总库存</div>
                <div>3000</div>
              </div>
              <div class="rightBox">
                <div>不收费耗材库存</div>
                <div>2000</div>
              </div>
            </div>
            <div class="bottom">
              <div>最高库存耗材：<span>800</span></div>
              <div>最低库存耗材：<span>100</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="centerBox">
        <div class="materialStatistics subjectBox">
          <titleBox titleName="耗材消耗统计">
            <div class="selectCycle">
              <div>日</div>
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="materialStatistics">
            <div class="box">
              <div class="title">
                收费材料
              </div>
              <div class="content">
                <div class="subBox">
                  <div>最大耗占比</div>
                  <div style="fontSize:18px;color:#0556e1">500</div>
                </div>
                <div class="subBox">
                  <div>最小耗占比</div>
                  <div style="fontSize:18px;color:#0556e1">600</div>
                </div>
                <div class="subBox">
                  <div>耗占比</div>
                  <div style="fontSize:18px;color:#0556e1">1100</div>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="title">
                不收费材料
              </div>
              <div class="content">
                <div class="subBox">
                  <div>最大耗占比</div>
                  <div style="fontSize:18px;color:#0556e1">500</div>
                </div>
                <div class="subBox">
                  <div>最小耗占比</div>
                  <div style="fontSize:18px;color:#0556e1">600</div>
                </div>
                <div class="subBox">
                  <div>耗占比</div>
                  <div style="fontSize:18px;color:#0556e1">1100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="consumableRecipients subjectBox">
          <titleBox titleName="科室耗材领用TOP10">
            <div class="selectCycle">
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="consumableRecipients"></div>
        </div>
        <div class="contentTwoBox">
          <div class="useRankings" style="border: 1px solid #6aaaeb;border-radius: 10px;padding: 10px;">
            <titleBox titleName="科室使用排名TOP10">
              <div class="selectCycle">
                <div>月</div>
                <div>年</div>
              </div>
            </titleBox>
            <div id="useRankings">
              <el-table :data="tableData"
                        :cell-style="cellStyle1"
                        height="120px"
                        :header-cell-style="{background:'#001d42',color:'#6aaaeb',borderColor:'#1b0046',fontSzie:'10px'}"
                        style="width: 100%">
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
                <el-table-column prop="warehouse"
                                label="耗材名称">
                </el-table-column>
                <el-table-column prop="inStorage"
                                label="规格">
                </el-table-column>
                <el-table-column prop="outStorage"
                                label="型号">
                </el-table-column>
                <el-table-column prop="remaine"
                                label="金额">
                </el-table-column>
              </el-table>
            </div>

          </div>
          <div class="useNumRankings" style="border: 1px solid #6aaaeb;border-radius: 10px;padding: 10px;">
            <titleBox titleName="耗材单品使用量排名">
              <div class="selectCycle">
                <div>月</div>
                <div>日</div>
                <div>年</div>
              </div>
            </titleBox>
            <div id="useNumRankings"></div>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <div class="diseaseConsumption subjectBox">
          <titleBox titleName="疾病耗材消耗金额与耗占比">
            <div class="selectCycle">
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="diseaseConsumption"></div>
        </div>
        <div class="consumptionRank subjectBox">
          <titleBox titleName="科室耗占比TOP5">
            <div class="selectCycle">
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="consumptionRank"></div>
        </div>
        <div class="suppliersRank subjectBox">
          <titleBox titleName="供应商供应排名TOP10">
            <div class="selectCycle">
              <div>月</div>
              <div>年</div>
            </div>
          </titleBox>
          <div id="suppliersRank">
            <el-table :data="tableData"
                      class="topBox"
                      :cell-style="cellStyle"
                      height="120px"
                      :header-cell-style="{background:'#011729',color:'#6aaaeb',borderColor:'#1b0046',fontSzie:'10px'}"
                      style="width: 100%">
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column prop="warehouse"
                               label="供应商名称">
              </el-table-column>
              <el-table-column prop="inStorage"
                               label="金额"
                               width="120">
              </el-table-column>
            </el-table>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins'
import titleBox from '@/components/title/index'
var myChart1, myChart2, myChart3, myChart4
export default {
  name: 'workTable',
  mixins: [mixin],
  components: {
    titleBox
  },
  data () {
    return {
      tableData: [
        {
          id: 1,
          warehouse: '仓库1',
          inStorage: 100,
          outStorage: 300,
          remaine: 400
        },
        {
          id: 1,
          warehouse: '仓库1',
          inStorage: 100,
          outStorage: 300,
          remaine: 400
        },
        {
          id: 1,
          warehouse: '仓库1',
          inStorage: 100,
          outStorage: 300,
          remaine: 400
        },
        {
          id: 1,
          warehouse: '仓库1',
          inStorage: 100,
          outStorage: 300,
          remaine: 400
        },
        {
          id: 1,
          warehouse: '仓库1',
          inStorage: 100,
          outStorage: 300,
          remaine: 400
        },
        {
          id: 1,
          warehouse: '仓库1',
          inStorage: 100,
          outStorage: 300,
          remaine: 400
        }
      ]
    }
  },
  // created () {
  // },
  mounted () {
    this.bus.$on('collapse', item => {
      setTimeout(() => {
        this.initConsumptionRank()
        this.initConsumableRecipients()
        this.initUseNumRankings()
        this.initDiseaseConsumption()
      })
    })
    this.initConsumptionRank()
    this.initConsumableRecipients()
    this.initUseNumRankings()
    this.initDiseaseConsumption()
    // this.getRanking()
    // this.getProportion()
  },
  methods: {
    initConsumptionRank () {
      if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
        myChart1.dispose(); //销毁
      }
      var chartDom = document.getElementById('consumptionRank');
      myChart1 = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: "#6aaaeb"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['第一名','第二名','第三名','第四名','第五名'],
          axisTick: {
            alignWithLabel: true
          },
          // axisLabel: {
          //   interval: 0,
          //   rotate: -35
          // },
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#6aaaeb",
            }
          }
        },
        yAxis: {
          type: 'value',
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#6aaaeb",
            }
          }
        },
        series: [
          {
            name: '科室收入',
            type: 'bar',
            data: [20000, 23489, 29034, 50000, 60000, 100000]
          },
          {
            name: '科室支出',
            type: 'bar',
            data: [20000, 23489, 29034, 50000, 60000, 100000]
          },
          {
            name: '科室耗占比',
            type: 'bar',
            data: [20000, 23489, 29034, 50000, 60000, 100000]
          },
        ]
      };
      option && myChart1.setOption(option);
    },
    initConsumableRecipients () {
      if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
        myChart2.dispose(); //销毁
      }
      var chartDom = document.getElementById('consumableRecipients');
      myChart2 = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: '1%',
          left: 'center',
          textStyle: {
            color: "#6aaaeb"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['第一名','第二名','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            rotate: -35
          },
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#6aaaeb",
            }
          }
        },
        yAxis: {
          type: 'value',
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#6aaaeb",
            }
          }
        },
        series: [
          {
            name: '低值耗材',
            type: 'bar',
            data: [20000, 23489, 29034, 50000, 60000, 100000, 20000, 23489, 29034, 50000, 60000]
          },
          {
            name: '高值耗材',
            type: 'bar',
            data: [20000, 23489, 29034, 50000, 60000, 20000, 23489, 29034, 50000, 60000, 100000]
          },
        ]
      };
      option && myChart2.setOption(option);
    },
    initUseNumRankings () {
      if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
        myChart3.dispose(); //销毁
      }
      var chartDom = document.getElementById('useNumRankings');
      myChart3 = this.$echarts.init(chartDom);
      var option = {
        title: [
          {
            subtext: '不同价格区间占比',
            left: '25%',
            top: '1%',
            textAlign: 'center',
            subtextStyle: {
              color: '#6aaaeb'
            },
          },
          {
            subtext: '收费/不收费占比',
            left: '75%',
            top: '3%',
            textAlign: 'center',
            subtextStyle: {
              color: '#6aaaeb'
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid: {
          left: '1%',
          right: '1%',
          top: '5%',
          containLabel: true
        },
        series: [
          {
            name: '不同价格区间占比',
            type: 'pie',
            radius: '50%',
            center: ['25%', '50%'],
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1038, name: '0-1000' },
              { value: 735, name: '1000-2000' },
              { value: 580, name: '2000-5000' },
              { value: 484, name: '5000-10000' },
              { value: 300, name: '10000以上' }
            ],
          },
          {
            name: '收费/不收费占比',
            type: 'pie',
            radius: '50%',
            center: ['75%', '50%'],
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1038, name: '收费' },
              { value: 735, name: '不收费' },
            ],
          }
        ]
      };
      option && myChart3.setOption(option);
    },
    initDiseaseConsumption () {
      if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
        myChart4.dispose(); //销毁
      }
      var chartDom = document.getElementById('diseaseConsumption');
      myChart4 = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: '1%',
          left: 'center',
          textStyle: {
            color: "#6aaaeb"
          }
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '3%',
          top: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 35
          },
          data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 100230]
          },
          {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 101807]
          }
        ]
      };
      option && myChart4.setOption(option);
    },
  },
}
</script>

<style lang="less" scoped>

.workTable {
  width: 100%;
  .content1 {
    height: calc(100vh - 60px);
    display: flex;
    background-color: #011729;
    color: #6aaaeb;
    background: url(./img/a2.png);
    background-size: cover;
    .subjectBox {
      border: 1px solid #6aaaeb;
      border-radius: 10px;
      padding: 10px;
      margin: 10px 5px;
    }
    .leftBox {
      width: 30%;
      height: calc(100vh - 60px);
      padding: 10px;
    }
    .centerBox {
      width: 40%;
      height: calc(100vh - 60px);
      padding: 10px;
      .contentTwoBox {
        display:flex;
        justify-content: space-between;
        height:calc(33% - 20px)
      }
    }
    .rightBox {
      width: 30%;
      height: calc(100vh - 60px);
      padding: 10px;
    }
    #paymentsAnalysis,
    #materialStatistics {
      color: #6aaaeb;
      height: calc(100% - 30px);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .box {
        height: 100%;
        display: flex;
        .title {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .content {
          flex: 3;
          display: flex;
          height: 100%;
          .subBox {
            flex: 1;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
          }
        }
      }
    }
    #consumptionRank {
      width: calc(100% - 20px);
      height: calc(100% - 30px);
    }
    #consumableRecipients {
      width: calc(100% - 20px);
      height: calc(100% - 30px);
    }
    #useNumRankings {
      width: calc(100% - 20px);
      height: calc(100% - 30px);
    }
    #diseaseConsumption {
      width: calc(100% - 20px);
      height: calc(100% - 30px);
    }
    #inventoryAmount {
      height: calc(100% - 30px);
      font-size: 14px;
      .top {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 50px);
        .leftBox {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
        .centerBox {
          display: flex;
          height: 100%;
          width: 100px;
          border: 3px solid #0556e1;
          border-radius: 50%;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
        .rightBox {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
      }
      .bottom {
          display: flex;
          height: 50px;
          align-items: center;
          justify-content: space-evenly;
      }
    }
    .paymentsAnalysis {
      height: calc(33% - 20px)
    }
    .warehouseAnalysis {
      height: 33%
    }
    .suppliersRank {
      height: calc(33% - 20px)
    }
    .inventoryAmount {
      height: calc(33% - 20px)
    }
    .consumableRecipients {
      height: 33%
    }
    .materialStatistics {
      height: calc(33% - 20px)
    }
    .useRankings {
      width: calc(50% - 5px);
      height: 100%
    }
    .consumptionRank {
      height: 33%;
    }
    .diseaseConsumption {
      height: calc(33% - 20px);
    }
    .useNumRankings {
      width: calc(50% - 5px);
      height: 100%;
        .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
          text-align: left !important;
        }
    }
  }
  .selectCycle {
    display: flex;
    div {
      width: 35px;
      height: 20px;
      margin-top: 5px;
      line-height: 20px;
      text-align: center;
      border: 1px solid;
    }
  }
}

@media screen and (max-width: 1200px) {
  .workTable {
    .content1 {
      height: auto;
      display: flex;
      flex-wrap: wrap;
      .leftBox {
        width: 100%;
      }
      .centerBox {
        width: 100%;
        .contentTwoBox {
          height: calc(40% -20px);
        }
      }
      .rightBox {
        width: 100%;
      }
    }
  }
}
.el-table {
  // 去除表格头部右边因为隐藏滚动条的空白
  /deep/ .el-table__fixed-right-patch {
    width: 0px !important;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
      width: 0px; /*滚动条宽度*/
      height: 0px; /*滚动条高度*/
  }
  /deep/ .el-table colgroup col[name='gutter']{
      width: 11px;
  }
  /deep/ .el-table__body{
      width: 100% !important;
  }
  /deep/ .gutter {
    background-color: #011729 !important;
  }
}
</style>