<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
/**
 * 模块说明 多数据折线图Eachart
 * @module foldLine
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
    setOptions ({ data, yearMax, yearMin } = {}) {
      let color = [
        '#1a9bfc',
        '#99da69',
        '#e32f46',
        '#7049f0',
        '#fa704d',
        '#01babc',
        '#ffcc99',
        '#ffffcc',
        '#336699',
        '#009966'
      ]
      // if (data === undefined) {
      //   return
      // }
      let splitCount = yearMax - yearMin
      let seriseData = []
      let yAxisData = []
      let legendData = []
      let xAxisData = []
      for (let i = 0; i < splitCount + 1; i++) {
        xAxisData.push(yearMax - i + '年')
      }
      data.forEach((item, index) => {
        //  let rgb = Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255)
        let temp = {
          name: item.name,
          type: 'line',
          symbolSize: 3,
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[index]
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(255,255,255,0)'
                  }
                ],
                false
              ),
              // shadowColor: 'rgba(255,255,255, 0.1)',
              shadowBlur: 10,
              opacity: 0.3
            }
          },
          itemStyle: {
            normal: {
              color: color[index],
              lineStyle: {
                width: 1,
                type: 'solid' // 'dotted'虚线 'solid'实线
              },
              borderColor: color[index], // 图形的描边颜色。支持的格式同 color
              borderWidth: 8, // 描边线宽。为 0 时无描边。[ default: 0 ]
              barBorderRadius: 0,
              label: {
                show: false
              },
              opacity: 0.5
            }
          },
          data: []
        }
        let temp2 = {
          type: 'value',
          scale: true,
          max: 15,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }

        legendData.push(item.name)
        yAxisData.push(temp2)
        seriseData.push(temp)
      })

      data.forEach((item, index) => {
        for (let i = 0; i < splitCount + 1; i++) {
          let count = 0
          item.data.forEach((items, val) => {
            if (yearMax - i === items.year) {
              count = items.count
            }
          })
          seriseData[index].data.push(count)
        }
      })
      console.log(seriseData)
      this.chart.setOption({
        backgroundColor: '#141f56',
        legend: {
          top: 20,
          itemGap: 5,
          itemWidth: 5,
          textStyle: {
            color: '#fff',
            fontSize: '10'
          },
          data: legendData
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#32346c'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#32346c '
              }
            },
            boundaryGap: false, // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#bac0c0',
                fontWeight: 'normal',
                fontSize: '12'
              }
            },
            data: xAxisData
          }
        ],
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              color: '#57617B'
            }
          },
          formatter:
            '{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}<br />{a4}: {c4}<br />{a5}: {c5}<br />{a6}: {c6}<br />{a7}: {c7}<br />{a8}: {c8}<br />{a9}: {c9}',
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], // 内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);' // 添加阴影
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#32346c'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#32346c '
            }
          },
          axisLabel: {
            textStyle: {
              color: '#bac0c0',
              fontWeight: 'normal',
              fontSize: '12'
            },
            formatter: '{value}'
          }
        },
        series: seriseData
      })
    }
  }
}
</script>
