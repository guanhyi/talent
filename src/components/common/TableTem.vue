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
        <div class="row relation-echart" v-if="haveData">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.path"
                  placement="top-start"
                >
                  <span>{{scope.row.name}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="机构">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.path"
                  placement="top-start"
                >
                  <span>{{scope.row.org}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="邮箱">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.path"
                  placement="top-start"
                >
                  <span>{{scope.row.Email}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="serach">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="query(scope.row)">查询</el-button>
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
    serach: {
      type: Boolean,
      default: false
    },
    haveData: {
      type: Boolean,
      default: false
    },
    showPath: {
      type: String
    },
    lable: {
      type: String
    }
  },
  watch: {},
  data () {
    return {}
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row.texttype === 'zju') {
        return 'row-red'
      } else if (row.texttype === 'chinese') {
        return 'row-highlighted'
      }
      return ''
    },
    query (data) {
      this.$emit('query', data)
    }
  },
  mounted () {}
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
    justify-content: space-between;
    padding-bottom: 20px;
    margin-top: 20px;
    .row-red {
      color: red;
    }
    .row-highlighted {
      background: #f8f8ff;
    }
  }
  .none {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
