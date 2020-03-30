<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
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
    ThemList: {
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
    ThemList: {
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
      if (Object.keys(this.ThemList).length) {
        this.setOptions(this.ThemList)
      }
      // this.chart.showLoading()
    },

    setOptions ({ data, yearMax, yearMin } = {}) {
      data.forEach((item, index) => {
        if (item.name === '期刊论文') {
          data[index].name = '中文期刊论文'
        }
      })
      let legendData = []
      data.forEach(item => {
        let name = item.name
        legendData.push(name)
      })
      let maxYear = yearMax === yearMin ? data[0].data[0].year : yearMax
      let minYear = yearMax === yearMin ? data[0].data[0].year - 5 : yearMin
      let splitCount = maxYear - minYear
      let Tdata = []
      data.forEach((items, indexs) => {
        for (let i = 0; i < splitCount + 1; i++) {
          let count = 0
          items.data.forEach(item => {
            if (maxYear - i === item.year) {
              count = item.count
            }
          })
          Tdata.push([
            maxYear - i, count, data[indexs].name
          ])
        }
      })
      if (parseInt((maxYear - minYear) / 15) > 0) {
        splitCount = (maxYear - minYear) / (parseInt((maxYear - minYear) / 15) * 2)
      }
      this.chart.setOption({
        title: {
          text: this.tit,
          x: 'center',
          y: 'bottom'
        },
        legend: {
          data: legendData,
          selectedMode: false
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            align: 'left'
          },
          formatter: function (params) {
            var html = params[0].axisValue + '年<br>'
            for (var i = 0; i < params.length; i++) {
              html += params[i].data[2] + ':' + params[i].data[1] + '<br>'
            }
            return html
          }
        },
        singleAxis: {
          top: '30%',
          bottom: '15%',
          type: 'value',
          min: minYear,
          max: maxYear,
          splitNumber: splitCount
        },
        series: [{
          type: 'themeRiver',
          data: Tdata,
          label: {
            normal: {
              show: false
            }
          }
        }]
      })
    }
  }
}
</script>
