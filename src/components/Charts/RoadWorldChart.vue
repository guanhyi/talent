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
      type: Array
      // require: true
    },
    isClick: {
      type: Boolean,
      default: false
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

      if (this.WordCloudList === undefined || !this.WordCloudList.length) {
        return
      }

      let data = this.WordCloudList

      // this.chart.hideLoading()
      this.chart.setOption({
        title: {
          text: '"一带一路"关联学术关键词', // 标题
          x: 'center',
          textStyle: {
            fontSize: 23
          }
        },
        backgroundColor: '#F7F7F7',
        tooltip: {
          show: true
        },
        series: [
          {
            name: '热点分析', // 数据提示窗标题
            type: 'wordCloud',
            sizeRange: [6, 66], // 画布范围，如果设置太大会出现少词（溢出屏幕）
            rotationRange: [-45, 90], // 数据翻转范围
            // shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6
            },
            textStyle: {
              normal: {
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
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: data
          }
        ]
      })
      const that = this
      if (this.isClick) {
        this.chart.off('click')
        this.chart.on('click', function (data) {
          if (data.name) {
            that.$router.push({
              name: 'Keyword',
              params: {
                keyword: data.name
              }
            })
          }
        })
      }
    }
  }
}
</script>
