<template>
  <div class="tableTem">
    <div class="home-body-relation">
      <el-divider content-position="left">合作路径</el-divider>
      <div class="PL_50 PR_50">
        <div class="relation-top row">
          <div>
            <span>展示路径：{{showPath}}{{lable}}</span>
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
            <el-table-column label="姓名">
              <template slot-scope="scope" >
                <el-tooltip
                  v-if="tip"
                  class="item"
                  effect="dark"
                  :content="tip?scope.row.path:''"
                  placement="top-start"
                >
                  <span>{{scope.row.isPath?scope.row.path:scope.row.name}}</span>
                </el-tooltip>
                <span v-else >{{scope.row.isPath?scope.row.path:scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="机构">
              <template slot-scope="scope" v-if="!scope.row.isPath" >
                <el-tooltip
                v-if="tip"
                  class="item"
                  effect="dark"
                  :content="scope.row.path"
                  placement="top-start"
                >
                  <span >{{scope.row.org}}</span>
                </el-tooltip>
                      <span v-else >{{scope.row.org}}</span>
              </template>
            </el-table-column>
            <el-table-column label="邮箱">
              <template slot-scope="scope"  v-if="!scope.row.isPath">
                <el-tooltip
                v-if="tip"
                  class="item"
                  effect="dark"
                  :content="scope.row.path"
                  placement="top-start"
                >
                  <span>{{scope.row.Email}}</span>
                </el-tooltip>
                <span v-else >{{scope.row.Email}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="serach">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="query(scope.row)">查询</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" v-if="more" @click="moreData">加载更多</el-button>
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
    serach: {
      type: Boolean,
      default: false
    },
    haveData: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    showPath: {
      type: String
    },
    tip: {
      type: Boolean,
      default: true
    },
    lable: {
      type: String
    }
  },
  watch: {

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
      if (row.isPath) {
        return {
          rowspan: 1,
          colspan: 3
        }
      }
    },
    query (data) {
      this.$emit('query', data)
    },
    moreData () {
      this.$emit('moreData', this.lable)
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
    .row-path{
      background: #CD00CD;
      color: white;
    }
    .row-path:hover > td{
      background: #CD00CD!important;
      color: white!important;
    }
    .el-buttom{
      margin-top: 20px;
    }
  }
  .none {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
