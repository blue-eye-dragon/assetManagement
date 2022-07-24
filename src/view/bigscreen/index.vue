<template>
  <div class="bigscreen">
    <div class="bigscreenOne">
      <titleBox titleName="概况"></titleBox>
      <div id="generalSituation">
        <div class="numBox">
          <p>常驻人口</p>
          <p class="num">11207178</p>
        </div>
        <div class="numBox">
          <p>管理人数</p>
          <p class="num">12160</p>
        </div>
        <div class="numBox">
          <p>统计时间</p>
          <p>2022-04-09</p>
        </div>
        <div class="numBox">
          <p>本年新建</p>
          <p class="num">3135</p>
        </div>
        <div class="numBox">
          <p>本月新建</p>
          <p class="num">143</p>
        </div>
        <div class="numBox">
          <p>当天新建</p>
          <p class="num">14</p>
        </div>
      </div>
      <titleBox titleName="管理概述"></titleBox>
      <div id="managementOverview">
      </div>
    </div>
    <div class="bigscreenTwo">
      <titleBox titleName="人群分布"></titleBox>
      <div id="distributionMap">
      </div>
    </div>
    <div class="bigscreenThree">
      <titleBox titleName="近七年新发病人"></titleBox>
      <div id="newOnset">
      </div>
    </div>
    <div class="bigscreenFour">
      <titleBox titleName="在管人数统计"></titleBox>
      <div id="peopleCounting">
      </div>
    </div>
    <div class="bigscreenFive">
      <titleBox titleName="在管病人分布"></titleBox>
      <div id="peopleDistribution">
      </div>
    </div>
    <div class="bigscreensix">
      <titleBox titleName="病种统计"></titleBox>
      <div id="diseaseStatistics">
      </div>
    </div>
  </div>
</template>

<script>
import data from './440400.json'
import titleBox from '@/components/title/index'
var myChart1, myChart2, myChart3, myChart4, myChart5, myChart6
export default {
  name: 'bigscreen',
  components: {
    titleBox
  },
  data () {
    return {

    }
  },
  mounted () {
    this.bus.$on('collapse', item => {
      setTimeout(() => {
        this.initMap()
        this.initManagement()
        this.initNewOnset()
        this.initPeopleCounting()
        this.initPeopleDistribution()
        this.initDiseaseStatistics()
      })
    })
    this.initMap()
    this.initManagement()
    this.initNewOnset()
    this.initPeopleCounting()
    this.initPeopleDistribution()
    this.initDiseaseStatistics()
  },
  methods: {
    initMap () {
      if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
        myChart1.dispose(); //销毁
      }
      var chartDom = document.getElementById('distributionMap');
      myChart1 = this.$echarts.init(chartDom);

      this.$echarts.registerMap('zhuhai', data);
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}人'
        },
        visualMap: {
          min: 0,
          max: 10000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          right: 'right',
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          },
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            type: 'map',
            map: 'zhuhai',
            label: {
              show: true,
                formatter: '{ng|{b}}',
              //标识内容；若要设置标识内容的样式，则需要像这样设置一个变量per或者ng，在rich配置项里去设置这2个变量的样式，则会改变对应标识内容的样式
              rich: { //设置标识内容样式
                  ng:{
                    // color: '#e2231b',
                  }
              }
            },
            data: [
              { name: '斗门区', value: 2444 },
              { name: '香洲区', value: 156 },
              { name: '金湾区', value: 1211 }
            ],
          }
        ]
      }
      option && myChart1.setOption(option);
    },
    initManagement () {
      if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
        myChart2.dispose(); //销毁
      }
      var chartDom = document.getElementById('managementOverview');
      myChart2 = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['全程督导', '全程管理', '智能工具辅助管理', '强化期督导', '志愿者', '家属', '自服药'],
          axisLabel: {
            interval: 0,
            rotate: -35
          },
          axisTick: {
            alignWithLabel: true
          },
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        yAxis: {
          type: 'value',
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      option && myChart2.setOption(option);
    },
    initNewOnset () {
      if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
        myChart3.dispose(); //销毁
      }
      var chartDom = document.getElementById('newOnset');
      myChart3 = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
          axisTick: {
            alignWithLabel: true
          },
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        yAxis: {
          type: 'value',
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
            smooth: true
          }
        ]
      };
      option && myChart3.setOption(option);
    },
    initPeopleCounting () {
      if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
        myChart4.dispose(); //销毁
      }
      var chartDom = document.getElementById('peopleCounting');
      myChart4 = this.$echarts.init(chartDom);
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
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['斗门区', '金湾区', '香洲区'],
          axisTick: {
            alignWithLabel: true
          },
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        yAxis: {
          type: 'value',
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        series: [
          {
            data: [2444, 1211, 1421],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            barWidth: 25
          }
        ]
      };
      option && myChart4.setOption(option);
    },
    initPeopleDistribution () {
      if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
        myChart5.dispose(); //销毁
      }
      var chartDom = document.getElementById('peopleDistribution');
      myChart5 = this.$echarts.init(chartDom);
      var option = option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: '在管病人分布',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '新发' },
              { value: 735, name: '复发' },
              { value: 580, name: '治疗失败' },
              { value: 484, name: '返回' },
              { value: 300, name: '其他' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
                formatter: '{ng|{c}}',
                //标识内容；若要设置标识内容的样式，则需要像这样设置一个变量per或者ng，在rich配置项里去设置这2个变量的样式，则会改变对应标识内容的样式
                rich: { //设置标识内容样式
                    ng:{
                      color: '#ffffff',
                    }
                }
            }
          }
        ]
      };
      option && myChart5.setOption(option);
    },
    initDiseaseStatistics () {
      if (myChart6 != null && myChart6 != "" && myChart6 != undefined) {
        myChart6.dispose(); //销毁
      }
      var chartDom = document.getElementById('diseaseStatistics');
      myChart6 = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['结核病','麻风病','性传播疾病','精神疾病','高血压','糖尿病'],
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
              color: "#fff",
            }
          }
        },
        yAxis: {
          type: 'value',
          //设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 54],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      option && myChart6.setOption(option);
    },
  },
}
</script>

<style lang="less" scoped>
.bigscreen {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  color: aliceblue;
  background-image: url(./img/a15.png);
  background-size: cover;
  .bigscreenOne {
    width: 27%;
    padding-left: 20px;
    border-bottom: 10px solid #dad9d9;
  }
  .bigscreenTwo {
    width: 45%;
    padding-left: 20px;
    border-left: 10px solid #dad9d9;
    border-right: 10px solid #dad9d9;
    border-bottom: 10px solid #dad9d9;
  }
  .bigscreenThree {
    width: 28%;
    padding-left: 20px;
    border-bottom: 10px solid #dad9d9;
  }
  .bigscreenFour {
    width: 30%;
    padding-left: 20px;
  }
  .bigscreenFive {
    width: 40%;
    padding: 0 20px;
    border-left: 10px solid #dad9d9;
    border-right: 10px solid #dad9d9;
  }
  .bigscreensix {
    width: 30%;
    padding-left: 20px;
  }
}
#newOnset {
  width: 100%;
  height: 380px;
}
#distributionMap {
  width: 100%;
  height: 380px;
}
#generalSituation {
  width: 100%;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  .numBox {
    width: 30%;
    font-size: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .num {
      font-size: 18px;
    }
  }
}
#managementOverview {
  width: 100%;
  height: 250px;
}
#peopleCounting {
  width: 100%;
  height: 300px;
}
#peopleDistribution {
  width: 100%;
  height: 300px;
}
#diseaseStatistics {
  width: 100%;
  height: 300px;
}
@media screen and (max-width: 1200px) {
  .bigscreen {
    .bigscreenOne {
      width: 100%;
      padding-left: 20px;
    }
    .bigscreenTwo {
      width: 100%;
      padding-left: 20px;
      border-left: 0;
      border-right: 0;
      border-bottom: 10px solid #dad9d9;
    }
    .bigscreenThree {
      width: 100%;
      padding-left: 20px;
      border-bottom: 10px solid #dad9d9;
    }
    .bigscreenFour {
      width: 100%;
      padding-left: 20px;
      border-bottom: 10px solid #dad9d9;
    }
    .bigscreenFive {
      width: 100%;
      padding: 0 20px;
      border-left: 0;
      border-right: 0;
      border-bottom: 10px solid #dad9d9;
    }
    .bigscreensix {
      width: 100%;
      padding-left: 20px;
    }
  }
  
}
</style>