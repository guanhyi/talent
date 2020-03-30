<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>

/**
 * 模块说明 饼图Eachart
 * @module PieScience
 * param Array PieScienceList [{count,name}]
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
      default: '300px'
    },
    PieScienceList: {
      type: Array,
      require: true
    },
    tit: {
      type: String
    }
  },
  watch: {
    PieScienceList: {
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
      if (this.PieScienceList === undefined || !this.PieScienceList.length) {
        return
      }

      let legendData = []
      let seriesData = []
      this.PieScienceList.forEach((item, index) => {
        legendData.push(item.name)
        let temp = {
          value: item.count,
          name: item.name
        }
        seriesData.push(temp)
      })
      this.chart.setOption({
        title: {
          text: this.tit,
          bottom: 0,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: '10',
          data: legendData
        },
        series: [
          {
            name: '借书',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
