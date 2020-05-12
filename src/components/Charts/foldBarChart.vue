<template>
  <div  :class="className" :style="{height:height,width:width}" />
</template>

<script>

/**
 * 模块说明 多数据柱状图Eachart
 * @module foldBar
 * param Object foldList [{data,yearMax,yearMin}]
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
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    tit: {
      type: String
    },
    foldList: {
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
    foldList: {
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
      this.setOptions(this.foldList)
      // this.chart.showLoading()
    },
    setOptions ({data, yearMax, yearMin} = {}) {
      if (data === undefined) {
        return
      }
      let splitCount = yearMax - yearMin
      let year = []
      let seriseData = []
      let yAxisData = []
      let legendData = []
      let xAxisData = []
      let max = 0
      for (let i = 0; i < splitCount + 1; i++) {
        year.push(yearMin + i)
      }
      let color = [ '85,161,161', '187,176,206', '127,170,202', '223,188,160', '191,145,148', '149,155,169', '174,164,67', '142,156,107', '140,120,119', '191,134,166', '112,73,240', '250,112,77', '1,186,188', '255,204,153', '255,255,204', '51,102,153', '0,153,102' ]
      data.forEach((item, index) => {
        // let rgb = Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255)
        let temp = {
          name: item.name,
          type: 'bar',
          xAxisIndex: index,
          yAxisIndex: index,
          barWidth: year.length > 5 ? 0 : 50,
          itemStyle: { color: 'rgba(' + color[index] + ', 0.8)' },
          data: []
        }

        let temp3 = {
          type: 'category',
          boundaryGap: true,
          data: year,
          show: !index
        }
        xAxisData.push(temp3)
        legendData.push(item.name)

        seriseData.push(temp)
      })
      data.forEach((item, index) => {
        for (let i = 0; i < splitCount + 1; i++) {
          let count = 0
          item.data.forEach((items, val) => {
            if (yearMin + i === items.year) {
              if (items.count > max) {
                max = items.count
              }
              count = items.count
            }
          })
          seriseData[index].data.push(count)
        }
        let temp = {
          show: !index,
          type: 'value',
          scale: true,
          max: max + 2,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
        yAxisData.push(temp)
      })

      this.chart.setOption({
        title: {
          text: this.tit ? this.tit : '',
          textStyle: {
            fontSize: 12,
            color: '#000'
          },
          bottom: 0,
          left: 'center'
        },
        legend: {
          data: legendData,
          left: 20
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: xAxisData,
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: yAxisData,
        series: seriseData
      })
    }
  }
}
</script>
