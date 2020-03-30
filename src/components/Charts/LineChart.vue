<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>

/**
 * 模块说明 折线图Eachart
 * @module lien
 * param Object lienList [{countVal,countYear}]
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    tit: {
      type: String
    },
    lienList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {

    lienList: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
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
      if (this.lienList === undefined) {
        return
      }
      console.log(this.tit)
      this.setOptions(this.lienList)
      // this.chart.showLoading()
    },
    
    setOptions ({ countVal, countYear } = {}) {
      this.chart.setOption({
        title: {
          text: this.tit,
          textStyle: {
            fontSize: 12
          }
        },
        xAxis: {
          data: countYear,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 20,
          bottom: 20,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [{
          name: this.tit,
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: countVal,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
