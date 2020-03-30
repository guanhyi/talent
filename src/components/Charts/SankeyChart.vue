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
    tit: {
      type: String,
      default: ''
    },
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
    sankeyList: {
      type: Object,
      required: true
    }
  },
  watch: {
    sankeyList: {
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
      let data = this.sankeyList
      console.log(this.sankeyList)
      if (JSON.stringify(data) === '{}') {
        return
      }
      this.chart.setOption({
        title: {
          text: this.tit || ''
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'sankey',
            layout: 'none',
            data: data.nodes,
            links: data.links,
            layoutIterations: 0,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#aaa'
              }
            },
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0.5
              }
            }
          }
        ]
      })
    }
  }
}
</script>
