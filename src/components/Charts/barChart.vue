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
    barData: {
      type: Object
    },
    tit: {
      type: String
    }
  },
  watch: {
    barData: {
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

      this.chart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
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
            data: this.barData.xData,
            axisLabel: {
              inierval: 0,
              rotate: 45
              // formatter: function (params, index) {
              //   if (index % 2 !== 0) {
              //     return '\n\n' + params
              //   } else {
              //     return params
              //   }
              // }

            },
            axisTick: {
              alignWithLabel: true
            }
          
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '借阅次数',
            type: 'bar',
            barWidth: '80%',
            data: this.barData.yData
          }
        ]
      })
    }
  }
}
</script>
