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
      default: '100%'
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
      this.chart.setOption({
        title: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 22,
            roam: false,
            focusNodeAdjacency: false,
            draggable: false,
            symbol: 'circle',
            label: {
              normal: {
                show: true,
                formatter: function (data) {
                  return data.name
                },
                color: '#000',
                position: 'bottom'
              }
            },
            edgeSymbol: ['', 'arrow'],
            edgeSymbolSize: [1, 9],

            data: [
              { name: '\u4e00\u5e26\u4e00\u8def', symbolSize: 80 },
              {
                name: '\u201c\u4e00\u5e26\u4e00\u8def\u201d\u6218\u7565',
                symbolSize: 80
              },
              {
                name: '\u201c\u4e00\u5e26\u4e00\u8def\u201d\u5021\u8bae',
                symbolSize: 80
              },
              { name: '\u4eba\u624d\u57f9\u517b', symbolSize: 50 },
              { name: '\u5bf9\u7b56', symbolSize: 50 },
              { name: '\u4e2d\u56fd', symbolSize: 50 },
              { name: '\u673a\u9047', symbolSize: 50 },
              { name: '\u56fd\u9645\u5316', symbolSize: 50 },
              { name: '\u6311\u6218', symbolSize: 50 },
              { name: '\u53d1\u5c55', symbolSize: 50 },
              {
                name: '\u4eba\u6c11\u5e01\u56fd\u9645\u5316',
                symbolSize: 19.1
              },
              {
                name: '\u5bf9\u5916\u76f4\u63a5\u6295\u8d44',
                symbolSize: 19.1
              },
              {
                name: '\u201c\u4e00\u5e26\u4e00\u8def\u201d\u5efa\u8bbe',
                symbolSize: 18.5
              },
              {
                name: '\u4eba\u7c7b\u547d\u8fd0\u5171\u540c\u4f53',
                symbolSize: 17.4
              },
              { name: '\u8de8\u5883\u7535\u5546', symbolSize: 16.5 },
              { name: '\u8d70\u51fa\u53bb', symbolSize: 16.1 },
              { name: '\u4e1d\u7ef8\u4e4b\u8def', symbolSize: 15.9 },
              { name: '\u7ecf\u6d4e\u53d1\u5c55', symbolSize: 15.7 },
              { name: '\u7b56\u7565', symbolSize: 14.7 },
              { name: '\u56fd\u9645\u8d38\u6613', symbolSize: 14.1 },
              { name: '\u533a\u57df\u7ecf\u6d4e', symbolSize: 14 },
              { name: '\u5bf9\u5916\u8d38\u6613', symbolSize: 13 },
              { name: '\u9ad8\u804c\u9662\u6821', symbolSize: 11.6 },
              { name: '\u8def\u5f84', symbolSize: 11.4 },
              { name: '\u65b0\u7586', symbolSize: 11.3 },
              { name: '\u5168\u7403\u5316', symbolSize: 11.2 },
              { name: '\u5f71\u54cd', symbolSize: 11.1 },
              { name: '\u98ce\u9669', symbolSize: 11 },
              { name: '\u4e1c\u76df', symbolSize: 10.5 },
              { name: '\u4e92\u8054\u4e92\u901a', symbolSize: 10.4 },
              { name: '\u201c\u8d70\u51fa\u53bb\u201d', symbolSize: 10.3 },
              { name: '\u5bf9\u5916\u5f00\u653e', symbolSize: 10.3 },
              { name: '\u6587\u5316\u4ea7\u4e1a', symbolSize: 10.3 },
              { name: '\u5168\u7403\u6cbb\u7406', symbolSize: 10.2 },
              { name: '\u9ad8\u7b49\u6559\u80b2', symbolSize: 10.2 },
              { name: '\u6218\u7565', symbolSize: 10.1 },
              { name: '\u56fd\u9645\u5408\u4f5c', symbolSize: 9.8 },
              { name: '\u804c\u4e1a\u6559\u80b2', symbolSize: 9.8 },
              { name: '\u5e7f\u897f', symbolSize: 9.1 },
              { name: 'SWOT\u5206\u6790', symbolSize: 9 },
              { name: '\u521b\u65b0', symbolSize: 9 },
              { name: '\u57fa\u7840\u8bbe\u65bd', symbolSize: 9 },
              { name: '\u7535\u5b50\u5546\u52a1', symbolSize: 8.6 },
              { name: '\u95ee\u9898', symbolSize: 8.6 },
              { name: '\u5bf9\u5916\u6295\u8d44', symbolSize: 8.5 },
              { name: '\u5408\u4f5c', symbolSize: 8.2 },
              { name: '\u73b0\u72b6', symbolSize: 8.2 }
            ],
            // links: [],
            links: [
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u201c\u4e00\u5e26\u4e00\u8def\u201d\u6218\u7565'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u201c\u4e00\u5e26\u4e00\u8def\u201d\u5021\u8bae'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u4eba\u624d\u57f9\u517b'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u5bf9\u7b56' },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u4e2d\u56fd' },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u673a\u9047' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u56fd\u9645\u5316'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u6311\u6218' },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u53d1\u5c55' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u4eba\u6c11\u5e01\u56fd\u9645\u5316'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u5bf9\u5916\u76f4\u63a5\u6295\u8d44'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u201c\u4e00\u5e26\u4e00\u8def\u201d\u5efa\u8bbe'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u4eba\u7c7b\u547d\u8fd0\u5171\u540c\u4f53'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u8de8\u5883\u7535\u5546'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u8d70\u51fa\u53bb'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u4e1d\u7ef8\u4e4b\u8def'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u7ecf\u6d4e\u53d1\u5c55'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u7b56\u7565' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u56fd\u9645\u8d38\u6613'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u533a\u57df\u7ecf\u6d4e'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u5bf9\u5916\u8d38\u6613'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u9ad8\u804c\u9662\u6821'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u8def\u5f84' },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u65b0\u7586' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u5168\u7403\u5316'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u5f71\u54cd' },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u98ce\u9669' },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u4e1c\u76df' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u4e92\u8054\u4e92\u901a'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u201c\u8d70\u51fa\u53bb\u201d'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u5bf9\u5916\u5f00\u653e'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u6587\u5316\u4ea7\u4e1a'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u5168\u7403\u6cbb\u7406'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u9ad8\u7b49\u6559\u80b2'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u6218\u7565' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u56fd\u9645\u5408\u4f5c'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u804c\u4e1a\u6559\u80b2'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u5e7f\u897f' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: 'SWOT\u5206\u6790'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u521b\u65b0' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u57fa\u7840\u8bbe\u65bd'
              },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u7535\u5b50\u5546\u52a1'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u95ee\u9898' },
              {
                source: '\u4e00\u5e26\u4e00\u8def',
                target: '\u5bf9\u5916\u6295\u8d44'
              },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u5408\u4f5c' },
              { source: '\u4e00\u5e26\u4e00\u8def', target: '\u73b0\u72b6' }
            ],

            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0.3,
                color: '#25cfb6'
              }
            },
            force: {
              repulsion: [0, 600],
              edgeLength: [0, 180],
              layoutAnimation: true
            }
          }
        ]
      })
    }
  }
}
</script>
