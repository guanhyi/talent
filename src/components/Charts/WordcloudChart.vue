<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
// 词云
import echarts from 'echarts' // echarts theme
import resize from './mixins/resize'
require('echarts/theme/macarons')
require('echarts-wordcloud')

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
    WordCloudList: {
      type: Array,
      require: true
    },
    isClick: {
      type: Boolean,
      default: false
    },
    tit: {
      type: String
    }
  },
  watch: {
    WordCloudList: {
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
      // this.chart.showLoading()

      if (this.WordCloudList === undefined || !this.WordCloudList.length) {
        return
      }

      let data = []
      this.WordCloudList.forEach((item, index) => {
        let temp = {
          name: item.name,
          value: item.count,
          textStyle: {
            normal: {},
            emphasis: {}
          }
        }
        data.push(temp)
      })
      // this.chart.hideLoading()
      this.chart.setOption({
        title: {
          text: this.tit,
          textStyle: {
            fontSize: 15
          }
        },
        series: [
          {
            type: 'wordCloud',
            shape: 'circle',
            left: 'center',
            top: 'center',
            width: '100%',
            height: '100%',
            right: null,
            bottom: null,
            sizeRange: [12, 25],
            rotationRange: [0, 0],
            gridSize: 10,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                fontFamily: 'sans-serif',
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 8,
                shadowColor: '#333'
              }
            },

            // Data is an array. Each array item must have name and value property.
            data: data
          }
        ]
      })
      const that = this
      if (this.isClick) {
        this.chart.off('click')
        this.chart.on('click', function (data) {
          if (data.name) {
            let routeUrl = that.$router.resolve({
              path: '/Keyword',
              query: {
                keyword: data.name
              }
            })
            window.open(routeUrl.href, '_blank')
          }
        })
      }
    }
  }
}
</script>
