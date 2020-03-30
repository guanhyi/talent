<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>

/**
 * 模块说明 多数据柱状图非重叠Eachart
 * @module Lines
 * param Object LineNList
 */

import echarts from 'echarts' // echarts theme
import resize from './mixins/resize'
require('echarts/theme/macarons')

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    LineNList: {
      type: Array,
      require: true
    },
    LineMList: {
      type: Array

    },
    tit: {
      type: String
    }
  },
  watch: {
    LinesList: {
      deep: true,
      handler (val) {
        this.initChart()
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      console.log(this.LineNList)
      console.log(this.LineMList)
      if (!Object.keys(this.LineNList).length) {
        return
      }
      this.chart.setOption({
        animation: false,
        title: {
          left: 0,
          text: this.tit
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          left: 'center',
          itemSize: 25,
          top: 55,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {}
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        legend: {
          data: ['环比', '同比']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            inside: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            inside: true,
            formatter: '{value}\n'
          },
          z: 10
        },
        grid: {
          top: 110,
          left: 15,
          right: 15,
          height: 160
        },
        dataZoom: [{
          type: 'inside',
          throttle: 50
        }],
        series: [
          {
            name: '同比',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#8ec6ad'
              }
            },
            stack: 'a',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#8ec6ad'
                }, {
                  offset: 1,
                  color: '#ffe'
                }])
              }
            },
            data: this.LineMList
          },
          {
            name: '环比',
            type: 'line',
            smooth: true,
            stack: 'a',
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#d68262'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#d68262'
                }, {
                  offset: 1,
                  color: '#ffe'
                }])
              }
            },
            data: this.LineNList
          }

        ]
      })
    }
  }
}
</script>
