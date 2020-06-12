<template>
  <div class="tableTem">
    <div class="home-body-relation">
      <el-divider content-position="left">合作路径</el-divider>
      <div class="PL_50 PR_50">
        <div class="relation-top row">
          <div></div>
        </div>
        <div class="row relation-echart" v-if="tableData.length">
          <el-table
            @row-click="clickCell"
            :data="tableData"
            border
            style="width: 100%"
            :span-method="arraySpanMethod"
            :row-class-name="tableRowClassName"
          >
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <el-button type="primary" v-if="scope.row.more" @click="moreData(scope.row)">加载更多</el-button>
                <el-tooltip
                  v-else-if="tip"
                  class="item"
                  effect="dark"
                  :content="scope.row.linkinfo"
                  placement="top-start"
                >
                  <span
                    style="cursor:pointer"
                    :id='"table"+index+scope.$index'
                  >{{scope.row.isPath?scope.row.title:scope.row.oData.Name}}</span>
                </el-tooltip>
                <span
                  style="cursor:pointer"
                  v-else
                  :id='"table"+index+scope.$index'
                >{{scope.row.isPath?scope.row.title:scope.row.oData.Name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="机构" align="center">
              <template slot-scope="scope" v-if="!scope.row.isPath && !scope.row.more">
                <el-tooltip
                  style="cursor:pointer"
                  v-if="tip"
                  class="item"
                  effect="dark"
                  :content="scope.row.linkinfo"
                  placement="top-start"
                >
                  <span>{{scope.row.oData.Organization}}</span>
                </el-tooltip>
                <span v-else>{{scope.row.oData.Organization}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="none" v-loading="loading">无符合此条件学者</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableTem',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    index: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    tip: {
      type: Boolean,
      default: false
    },
    lines: {
      type: Array
    },
    lines2: {
      type: Array
    }
  },
  watch: {
    lines: {
      deep: true,
      handler () {
        if (this.lines.length) {
          this.$nextTick(() => {
            this.drwaLine(this.lines)
          })
        }
      }
    }
  },
  data () {
    return {
      line1: [],
      line2: [],
      line3: [],
      line: []
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row.texttype === 'zju') {
        return 'row-red'
      } else if (row.texttype === 'chinese') {
        return 'row-highlighted'
      } else if (row.linkcount > 5) {
        return 'row-purple'
      }
      if (row.isPath) {
        return 'row-path'
      }
      return ''
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (row.isPath || row.more) {
        return {
          rowspan: 1,
          colspan: 2
        }
      }
    },
    query (data) {
      this.$emit('query', data)
    },
    moreData (row) {
      let data = {
        index: this.index,
        type: row.type
      }

      this.$emit('moreData', data)
    },
    clickCell (row, column, cell, event) {
      if (!column || row.isPath) {
        return
      }
      let routeData = this.$router.resolve({
        name: '/',
        query: { name: row.oData.Name, Organization: row.oData.Organization }
      })
      window.open(routeData.href, '_blank')
    },
    drwaLine (data) {
      if (!data.length) {
        return
      }
      // Leader line options
      let options = {
        color: '#5bf',
        endPlug: 'disc',
        size: 2,
        startSocket: 'left',
        endSocket: 'right',
        hide: true
      }
      // Anchor styles
      let that = this
      data.forEach((record, index) => {
        var anchor = LeaderLine.mouseHoverAnchor(
          document.getElementById(record.start),
          'draw',
          {
            // 指引线动效
            animOptions: {
              duration: 500
            },
            // 清除默认的hover样式
            hoverStyle: {
              backgroundColor: null
            },
            style: {
              paddingTop: null,
              paddingRight: null,
              paddingBottom: null,
              paddingLeft: null,
              cursor: null,
              backgroundColor: null,
              backgroundImage: null,
              backgroundSize: null,
              backgroundPosition: null,
              backgroundRepeat: null
            },
            // 当起始点被hover时调用的事件
            onSwitch: function (event) {
              if (that.index === '3') {
                if (event.type === 'mouseenter') {
                  that.line3[record.start].show()
                } else if (event.type === 'mouseleave') {
                  that.line3[record.start].hide()
                }
              }
            }
          }
        )
        if (this.index === '2') {
          this.line1[record.start] = new LeaderLine(
            anchor,
            document.getElementById(record.end),
            options
          )
        } else if (this.index === '3') {
          this.line2[record.start] = new LeaderLine(
            anchor,
            document.getElementById(record.end),
            options
          )
          let indexn = that.lines2.findIndex(item => item.start === record.end)
          that.line3[record.start] = new LeaderLine(
            document.getElementById(that.lines2[indexn].start),
            document.getElementById(that.lines2[indexn].end),
            {
              color: '#5bf',
              endPlug: 'disc',
              size: 2,
              duration: 500,
              timing: [0.58, 0, 0.42, 1],
              hide: true
            }
          ).hide('draw', { duration: 2000, timing: [0.42, 0.6, 0.4, 1] })
        }
      })
    }
    // hover (row, column, cell, event) {
    //   if (!column || row.isPath || !this.lines) {
    //     return
    //   }
    //   if (this.lines2) {

    //   } else {
    //     if (this.line[row.oData.Id]) {
    //       console.log(this.line[row.oData.Id].show())
    //       console.log(this.line[row.oData.Id].position())

    //       this.line[row.oData.Id].show()
    //       this.line[row.oData.Id].position()
    //       return
    //     }
    //     let indexn = this.lines.findIndex(item => item.start === row.oData.Id)
    //     this.line[row.oData.Id] = new LeaderLine(
    //       document.getElementById(this.lines[indexn].start),
    //       document.getElementById(this.lines[indexn].end),
    //       {
    //         color: '#5bf',
    //         endPlug: 'disc',
    //         size: 2,
    //         duration: 500,
    //         timing: [0.58, 0, 0.42, 1],
    //         hide: true
    //       }
    //     ).hide('draw', { duration: 2000, timing: [0.42, 0.6, 0.4, 1] })
    //     this.line[row.oData.Id].show()
    //   }
    // },
    // leave (row, column, cell, event) {
    //   if (!column || row.isPath || !this.lines) {
    //     return
    //   }
    //   this.line[row.oData.Id].hide()
    // }
  },
  mounted () {}
}
</script>

<style lang="scss">
.home-body-relation {
  min-height: 400px;
  width: 100%;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  .el-divider--horizontal {
    margin-top: 0 !important;
  }
  .relation-none {
    display: flex;
    span {
      margin: auto;
    }
  }
  .relation-top {
    justify-content: space-between;
  }
  .relation-node {
    width: 80%;
    margin-left: 20%;
    justify-content: space-between;
    align-items: center;
    .el-input {
      width: 25%;
    }
  }
  .relation-echart {
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-top: 20px;
    .row-red {
      color: red;
    }
    .row-highlighted {
      background: #f8f8ff;
    }
    .row-path {
      background: #cd00cd;
      color: white;
    }
    .row-path:hover > td {
      background: #cd00cd !important;
      color: white !important;
    }
    .row-purple {
      color: #cd00cd;
    }
    .el-button {
      width: 90%;
    }
    .el-table td,
    .el-table th {
      padding: 8px 0 !important;
    }
  }
  .none {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
