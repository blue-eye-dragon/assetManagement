<template>
  <div class="workTable memberlist">
    <cardType :cardList="cardList"></cardType>
    <div class="content1">
      <div class="content1Box1">
        <p class="title">数据展示</p>
        <el-table
          :data="tableData"
          stripe
          border
          max-height="270"
          style="width: 100%"
          :cell-style="cellStyle"
          :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
        >
          <el-table-column
            prop="department"
            fixed
            label="科室"
          >
          </el-table-column>
          <el-table-column
            prop="toReported"
            label="待上报"
            sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="exclude"
            label="排除"
            sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="pending"
            label="待审批"
            sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="approval"
            label="已审批"
            sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="Back"
            label="退回"
            sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="all"
            label="全部"
            sortable
            width="120"
          >
          </el-table-column>
        </el-table>
        <p class="title">图形展示</p>
        <div id="dataEcharts"></div>
      </div>
      <div class="content1Box2">
        <div style="height:50%">
          <p class="title">未上报占比</p>
          <div id="ranking"></div>
        </div>
        <div style="height:50%">
          <p class="title">科室排名</p>
          <div id="proportion"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins'
import cardType from '@/components/cardType/index'
var myChart1
var myChart2
var myChart3
export default {
  name: 'workTable',
  mixins: [mixin],
  components: {
    cardType
  },
  data () {
    return {
      isCollapse: false,
      cardList: [
        {
          id: '2',
          title1: '传染病监测',
          title: '疾病报告管理',
          path: '/patientList',
          toAudit: '12',
          audited: '15',
          willExpire: '9'
        },
        {
          id: '2',
          title1: '慢病监测',
          title: '疾病报告管理',
          path: '/patientList',
          toAudit: '21',
          audited: '45',
          willExpire: '12'
        },
        {
          id: '2',
          title1: '精神障碍监测',
          title: '疾病报告管理',
          path: '/patientList',
          toAudit: '14',
          audited: '31',
          willExpire: '11'
        },
        {
          id: '2',
          title1: '死因监测',
          title: '疾病报告管理',
          path: '/patientList',
          toAudit: '16',
          audited: '42',
          willExpire: '21'
        },
        {
          id: '2',
          title1: '食源性疾病监测',
          title: '疾病报告管理',
          path: '/patientList',
          toAudit: '21',
          audited: '24',
          willExpire: '15'
        },
        {
          id: '2',
          title1: '其它监测',
          title: '疾病报告管理',
          path: '/patientList',
          toAudit: '16',
          audited: '25',
          willExpire: '13'
        },
      ],
      tableData: [
        {
          department: '神经内科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '消化科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '血液科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '肾内科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '内分泌科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '神经外科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '肿瘤科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '普外科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '泌尿外科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '心胸外科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '肿瘤放疗科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '产科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '中医科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        },
        {
          department: '口腔科',
          toReported: '12',
          exclude: '5',
          pending: '13',
          approval: '51',
          Back: '14',
          all: '233'
        }
      ]
    }
  },
  // created () {
  // },
  mounted () {
    this.bus.$on('collapse', item => {
      setTimeout(() => {
        this.getDataEcharts()
        this.getRanking()
        this.getProportion()
      })
    })
    this.getDataEcharts()
    this.getRanking()
    this.getProportion()
  },
  methods: {
    getDataEcharts () {
      if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
        myChart1.dispose(); //销毁
      }
      var chartDom = document.getElementById('dataEcharts');
      myChart1 = this.$echarts.init(chartDom);
      var option = {
        // title: {
        //   text: 'Stacked Line'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['神经内科', '消化科', '血液科', '肾内科', '内分泌科', '神经外科', '肿瘤科', '普外科', '泌尿外科', '心胸外科', '肿瘤放疗科', '产科', '中医科', '口腔科']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '神经内科',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '消化科',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '血液科',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '肾内科',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '内分泌科',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '神经外科',
            type: 'line',
            stack: 'Total',
            data: [720, 532, 231, 514, 1320, 1530, 1320]
          },
          {
            name: '肿瘤科',
            type: 'line',
            stack: 'Total',
            data: [824, 235, 614, 315, 615, 1553, 1734]
          },
          {
            name: '普外科',
            type: 'line',
            stack: 'Total',
            data: [515, 414, 134, 513, 1445, 1515, 1613]
          },
          {
            name: '泌尿外科',
            type: 'line',
            stack: 'Total',
            data: [1332, 414, 515, 134, 517, 345, 153]
          },
          {
            name: '心胸外科',
            type: 'line',
            stack: 'Total',
            data: [141, 245, 345, 515, 414, 1330, 1643]
          },
          {
            name: '肿瘤放疗科',
            type: 'line',
            stack: 'Total',
            data: [134, 151, 616, 1414, 1412, 1330, 1320]
          },
          {
            name: '产科',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '中医科',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '口腔科',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      option && myChart1.setOption(option);
    },
    getRanking () {
      if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
        myChart2.dispose(); //销毁
      }
      var chartDom = document.getElementById('ranking');
      myChart2 = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '0%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '神经内科' },
              { value: 735, name: '消化科' },
              { value: 580, name: '血液科' },
              { value: 484, name: '肾内科' },
              { value: 300, name: '内分泌科' }
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
    getProportion () {
      if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
        myChart3.dispose(); //销毁
      }
      var chartDom = document.getElementById('proportion');
      myChart3 = this.$echarts.init(chartDom);
      var option = {
        xAxis: {
          // type: 'category',
          data: ['内分泌科', '消化科', '血液科', '肾内科', '内分泌科', '神经外科', '肿瘤科', '普外科', '泌尿外科', '心胸外科', '肿瘤放疗科', '产科', '中医科'],
          axisLabel: {
            interval: 0,
            rotate: '-45'
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 65, 74, 90, 140, 89, 24],
            type: 'bar',
            barWidth: 10,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      option && myChart3.setOption(option);
    }
  },
}
</script>

<style lang="less" scoped>
.workTable {
  .content1 {
    height: 100vh;
    display: flex;
    .content1Box1 {
      height: 100%;
      width: 66.6%;
      padding: 10px 10px 0;
    }
    .content1Box2 {
      height: 100%;
      width: 33.3%;
      padding: 10px 10px 0;
      border-left: 10px solid #dad9d9;
    }
  }
  #dataEcharts {
    width: 100%;
    height: calc(100% - 350px);
  }
  #ranking {
    width: 100%;
    height: calc(100% - 50px);
  }
  #proportion {
    width: 100%;
    height: calc(100% - 50px);
  }
  .title {
    text-align: left;
    padding: 10px;
    font-size: 18px;
  }
}

@media screen and (max-width: 1200px) {
  .workTable {
    .content1 {
      height: auto;
      display: flex;
      flex-wrap: wrap;
      .content1Box1 {
        height: 100vh;
        width: 100%;
        padding: 10px 10px 0;
      }
      .content1Box2 {
        height: 100vh;
        width: 100%;
        padding: 10px 10px 0;
        border-left: 0;
      }
    }
  }
}
</style>