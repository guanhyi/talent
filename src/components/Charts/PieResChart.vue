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
      default: '300px'
    },
    chartData: {
      type: Array
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    'chartData' (val) {
      this.$nextTick(() => {
        this.initChart(val)
      })
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart (chartData) {
      this.chart = echarts.init(this.$el, 'macarons')
      const ydata = chartData
      let yearData = []
      chartData.forEach(item => {
        yearData.push(item.name)
      })
      this.chart.setOption({
        title: {
          text: '当前机构学术研究趋势',
          link: '',
          left: 'center'
        },
        backgroundColor: 'rgba(255,255,255,1)',
        color: ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec', '#cf9ef1'],
        legend: {
          orient: 'vartical',
          x: 'center',
          top: 'center',
          left: '0%',
          bottom: '0%',
          data: yearData,
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 16,
          formatter: function (name) {
            return '' + name
          }
        },
        series: [{
          type: 'pie',
          clockwise: false, // 饼图的扇区是否是顺时针排布
          minAngle: 2, // 最小的扇区角度（0 ~ 360）
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: { // 图形样式
            normal: {
              borderColor: '#ffffff',
              borderWidth: 6
            }
          },
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: function (params) {
                var str = params.name + '年 ' + '{val|' + '(' + params.value + ')' + '}' + ' ' + '{per|' + params.percent + '%}' + '\n'

                return str
              },
              rich: {
                text: {
                  color: '#666',
                  fontSize: 14,
                  align: 'center',
                  verticalAlign: 'middle',
                  padding: 8
                },
                val: {
                  color: '#666',
                  fontSize: 16,
                  align: 'center',
                  verticalAlign: 'middle'
                },
                per: {
                  color: '#666',
                  fontSize: 20,
                  align: 'center',
                  verticalAlign: 'middle',
                  padding: 8
                }
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: 24
              }
            }
          },
          data: ydata
        }]
      })
      setTimeout(() => {
        this.chart.on('mouseover', (params) => {
          if (params.name === ydata[0].name) {
            this.chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            })
          } else {
            this.chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: 0
            })
          }
        })
        this.chart.on('mouseout', (params) => {
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
        })
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        })
      }, 1000)
    }
  }
}
</script>
