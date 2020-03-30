<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>

/**
 * 模块说明 树状图Eachart
 * @module Tree
 * param Object TreeData
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
    treeData: {
      type: Object,
      required: true
    },
    left: {
      type: String,
      default: '20%'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    treeData: {
      deep: true,
      handler (val) {
        this.chart.dispose()
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
      if (this.treeData === undefined) {
        return
      }
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [this.treeData],
            top: '1%',
            left: this.left,
            bottom: '1%',
            right: '10%',
            symbolSize: 7,
            itemStyle: {
              label: {
                show: true,
                formatter: '11'
              }
            },
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            expandAndCollapse: true,
            initialTreeDepth: 2,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
      let that = this
      this.chart.on('click', function (data) {
        console.log(1)
        if (data.value === 'org') {
          if (!data.data.collapsed) {
            that.treeData.children[data.data.index].collapsed = !data.data.collapsed
            if (data.data.children.length) {
              that.treeData.children[data.data.index].label.formatter = '{b0}(' + data.data.children.length + ')'
            }
          } else {
            that.treeData.children[data.data.index].collapsed = !data.data.collapsed
            that.treeData.children[data.data.index].label.formatter = '{b0}'
          }
        } else if (data.value === 'exp') {
          that.$emit('name', data.name)
        }
      })
    }
  }
}
</script>
