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
      var cellphoneBrand = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013']
      var cellphoneBrand1 = ['article(155023)', 'article(155023)', 'article(155023)', 'article(155023)', 'article(155023)', 'article(155023)', 'article(155023)', 'article(155023)']
      var cellphoneBrand2 = ['human(165035)', 'human(165035)', 'human(165035)', 'human(165035)', 'human(165035)', 'human(165035)', 'human(165035)', 'human(165035)']

      var data1 = []
      for (var i = 0; i < 8; ++i) {
        data1.push({
          name: cellphoneBrand[i],
          label: {
            position: 'inside',
            rotate: 'tangential'
          },
          children: [{
            name: cellphoneBrand1[i],
            value: 2,
            label: {
              position: 'inside',
              rotate: 'tangential'
            }

          }, {
            name: cellphoneBrand2[i],
            value: 2,
            label: {
              position: 'intside',
              rotate: 'tangential'
            }
          }]
        })
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          text: '当前机构学术研究趋势',
          subtext: 'data from IDC',
          link: ''
        },
        tooltip: {
          show: false
        },
        legend: {
        // type:'scroll',
          bottom: 20,
          x: 'center',
          data: ['Apple', 'Huawei', 'Xiaomi', 'Samsung', 'Oppo', 'others']
        },

        series: [{
          type: 'pie',
          radius: ['6%', '20%'],
          roseType: 'area',
          zlevel: 2,
          tooltip: {
            show: true,
            formatter: '{b}: {c}%'
          },

          label: {
            show: true,
            formatter: '{b}\n{c}%'
          },

          data: [{
            value: 14.7,
            name: 'Apple'
          },
          {
            value: 10.4,
            name: 'Huawei'
          },
          {
            value: 6.3,
            name: 'Xiaomi'
          },
          {
            value: 21.6,
            name: 'Samsung'
          },
          {
            value: 7.6,
            name: 'Oppo'
          },
          {
            value: 39.4,
            name: 'others'
          }
          ]
        }, {
          type: 'sunburst',
          nodeClick: false,
          levels: [{}, {
            r0: '48%',
            r: '60%',
            label: {},
            itemStyle: {
              // shadowBlur: 2,
              borderWidth: 6,
              borderColor: '#42ced1',
              opacity: 1
            }
          }, {
            r0: '60%',
            r: '70%',
            label: {},
            itemStyle: {
              borderWidth: 6,
              borderColor: '#42b0d1',
              opacity: 0.6
            }
          }, {
            r0: '70%',
            r: '76%',

            itemStyle: {
              borderWidth: 6,
              borderColor: '#22bfb1',
              opacity: 0.2
            }
          }],
          data: data1

        }]
      })
    }
  }
}
</script>
