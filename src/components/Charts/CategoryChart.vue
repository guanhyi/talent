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
    CategoryList: {
      type: Object,
      require: true
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    CategoryList: {
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
    if (this.times) {
      // 如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.times)// 关闭
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      if (this.CategoryList.length) {
        this.setOptions(this.CategoryList)
      }
      // this.chart.showLoading()
    },
    setOptions ({ keywords, keywordsdata, year } = {}) {
      let dataOptions = []
      let maxData = 0
      let obj = []
      this.chart.hideLoading()
      if (!year) {
        this.chart.showLoading()
      }
      let subtext = '(基于专家中文期刊论文生成，点击柱状图可以查看详细内容)'
      keywords.forEach((item, index) => {
        if (item.length > 6) {
          item.forEach((items, indexs) => {
            if (indexs % 2 !== 0) {
              keywords[index][indexs] = '\n' + keywords[index][indexs]
            }
          })
        }
      })
      year.forEach((item, index) => {
        obj[item] = []
        let value = keywordsdata[index]
        let keyword = keywords[index]
        value.forEach((items, indexs) => {
          maxData = items > maxData ? items : maxData
          obj[item][indexs] = {
            name: keyword[indexs],
            value: items
          }
        })
      })
      year.forEach((item, index) => {
        let tempOption = {
          title: {
            text: item + '年' + this.name + this.tit,
            subtext: subtext,
            x: 'center'
          },
          series: [{ data: obj[item] }]
        }
        dataOptions.push(tempOption)
      })
      this.options = {
        baseOption: {
          timeline: {
            axisType: 'category',
            show: true,
            autoPlay: true,
            playInterval: 60000,
            data: year,
            label: {
              formatter: function (s) {
                return new Date(s).getFullYear()
              }
            }
          },
          calculable: true,
          grid: {
            top: 80,
            bottom: 100
          },
          xAxis: [
            {
              type: 'category',
              axisLabel: { interval: 0 },
              data: keywords,
              splitLine: { show: false }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '次数',
              max: maxData
            }
          ],
          series: [{ name: '关键词', type: 'bar' }]
        },
        options: dataOptions
      }
      this.chart.setOption(this.options)
      this.keywordsFor(keywords)
      let bigLoopFunc = setInterval(function () {
        this.keywordsFor(keywords)
      }, 4000 * keywords.length)
      const that = this
      this.chart.on('timelinechanged', function (data) {
        let opto = that.options
        opto.baseOption.timeline.autoPlay = false
        opto.baseOption.xAxis[0].data = keywords[data.currentIndex]
        opto.baseOption.timeline.currentIndex = data.currentIndex
        that.chart.setOption(opto)
        clearInterval(bigLoopFunc)
      })
      this.chart.on('timelineplaychanged', function (data) {
        if (data && data.playState) {
          that.options.baseOption.timeline.autoPlay = true
          that.keywordsFor(keywords)
          bigLoopFunc = setInterval(function () {
            that.keywordsFor(keywords)
          }, 4000 * keywords.length)
        } else if (data) {
          that.options.baseOption.timeline.autoPlay = false
          clearInterval(bigLoopFunc)
        }
      })
    },
    refreshOption (keywords, i) {
      this.times = setTimeout(() => {
        let opto = this.options
        opto.baseOption.xAxis[0].data = keywords[i]
        opto.baseOption.timeline.currentIndex = i
        this.chart.setOption(opto, true)
      }, 4000 * i)
    },
    keywordsFor (keywords) {
      keywords.forEach((item, index) => {
        this.refreshOption(keywords, index)
      })
    }
  }
}
</script>
