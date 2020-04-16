<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>

/**
 * 模块说明 人物Eachart
 * @module Tree
 * param Object figureData
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
      default: '550px'
    },
    figureData: {
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
    figureData: {
      deep: true,
      handler (val) {
        console.log(1)

        this.initChart()
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
      if (!Object.keys(this.figureData).length) {
        return
      }
      console.log(this.figureData)

      this.chart.setOption({
        title: {
          text: ''
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12
            }
          }
        },
        legend: {
          x: 'center',
          show: false,
          data: ['查询', '机构', '专家', '起点']
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [{
              name: '查询',
              itemStyle: {
                normal: {
                  color: '#FF7F50'
                }
              }
            }, {
              name: '机构',
              itemStyle: {
                normal: {
                  color: '#1E90FF'
                }
              }
            }, {
              name: '专家',
              itemStyle: {
                normal: {
                  color: '#FF1493'
                }
              }
            }, {
              name: '起点',
              itemStyle: {
                normal: {
                  color: '#32CD32'
                }
              }
            }],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            force: {
              repulsion: 3000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10
                },
                formatter: '{c}'
              }
            },
            data: this.figureData.nodes,
            links: this.figureData.lines,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0
              }
            }
          }
        ]
      })
      console.log(this.chart.getOption())
      // let that = this
      // this.chart.on('click', function (data) {
      //   if (data.value === 'org') {
      //     if (!data.data.collapsed) {
      //       that.treeData.children[data.data.index].collapsed = !data.data.collapsed
      //       if (data.data.children.length) {
      //         that.treeData.children[data.data.index].label.formatter = '{b0}(' + data.data.children.length + ')'
      //       }
      //     } else {
      //       that.treeData.children[data.data.index].collapsed = !data.data.collapsed
      //       that.treeData.children[data.data.index].label.formatter = '{b0}'
      //     }
      //   } else if (data.value === 'exp') {
      //     that.$emit('name', data.name)
      //   }
      // })
    }
  }
}
</script>
