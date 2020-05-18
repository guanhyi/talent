<template>
  <div class="tableTem">
    <div class="home-body-relation">
      <el-divider content-position="left">合作路径</el-divider>
      <div class="PL_50 PR_50">
        <div class="relation-top row">
          <div>
            <!-- <span>展示路径：{{showPath}}{{lable}}</span> -->
          </div>
        </div>
        <div class="row relation-echart" v-if="tableData.length">
          <el-table
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
                  <span>{{scope.row.isPath?scope.row.title:scope.row.oData.Name}}</span>
                </el-tooltip>
                  <!-- <el-button type="primary" v-else-if="scope.$index === paparSize" @click="moreData">加载更多</el-button> -->
                <span v-else>{{scope.row.isPath?scope.row.title:scope.row.oData.Name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="机构" align="center">
              <template slot-scope="scope" v-if="!scope.row.isPath && !scope.row.more">
                <el-tooltip
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
        <div v-else class="none">无符合此条件学者</div>
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
    showPath: {
      type: String
    },
    tip: {
      type: Boolean,
      default: false
    },
    lable: {
      type: String
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler () {
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row.texttype === 'zju') {
        return 'row-red'
      } else if (row.texttype === 'chinese') {
        return 'row-highlighted'
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
        type: row.type,
        size: row.size
      }
      this.$emit('moreData', data)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.home-body-relation {
  min-height: 200px;
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
    .el-button {
      width: 90%;
    }
    .el-table td, .el-table th{
      padding: 8px 0!important;
    }
  }
  .none {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
