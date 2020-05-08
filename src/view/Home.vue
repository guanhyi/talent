<template>
  <div class="layer">
    <div class="home" v-loading="loading">
      <div class="home-header MT_50">
        <el-divider content-position="left">学者合作路径查询</el-divider>
        <div class="home-header-search PR_20 PL_20">
          <span>查询人名</span>
          <el-input class="ML_30" v-model="name" placeholder="必填"></el-input>
          <span class="ML_30">查询机构</span>
          <el-input class="ML_30" v-model="org" placeholder="必填"></el-input>
          <el-button class="ML_30" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
      </div>
      <!-- <div class="home-body row MT_50" v-if="searchShow">
        <div class="home-body-relation">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：{{showPath}}论文合作学者</span>
              </div>
            </div>
            <div class="row relation-echart">
              <figureChart style="width:100%" :figureData="figureData1" class="MT_30"></figureChart>
            </div>
          </div>
        </div>
        <div class="home-body-relation">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：{{showPath}}同机构学者</span>
              </div>
            </div>
            <div class="row relation-echart">
              <figureChart style="width:100%" :figureData="figureData2" class="MT_30"></figureChart>
            </div>
          </div>
        </div>
        <div class="home-body-relation">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：{{showPath}}同领域中国学者</span>
              </div>
            </div>
            <div class="row relation-echart">
              <figureChart style="width:100%" :figureData="figureData3" class="MT_30"></figureChart>
            </div>
          </div>
        </div>
      </div>-->
      <div class="home-body row MT_50" v-if="searchShow">
        <div class="home-body-relation">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：{{showPath}}论文合作学者</span>
              </div>
            </div>
            <div class="row relation-echart" v-if="haveData">
              <el-table :data="tableData1" border style="width: 100%"  :row-class-name="tableRowClassName">
                <el-table-column  label="姓名" >
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column prop="org" label="机构"></el-table-column>
                <el-table-column prop="Email" label="邮箱"></el-table-column>
              </el-table>
            </div>
            <div v-else class="none">无符合此条件学者</div>
          </div>
        </div>
      </div>
      <div class="home-body row MT_50" v-if="searchShow">
        <div class="home-body-relation">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：{{showPath}}的同事</span>
                <p>注：同事的范围定为在同期刊发文的同机构学者</p>
              </div>
            </div>
            <div class="row relation-echart" v-if="haveData">
              <el-table :data="tableData2" border style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="org" label="机构"></el-table-column>
                <el-table-column prop="Email" label="邮箱"></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="query(scope.row)">查询</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else class="none">无符合此条件学者</div>
          </div>
        </div>
          <div class="home-body-relation">
            <el-divider content-position="left">合作路径</el-divider>
            <div class="PL_50 PR_50">
              <div class="relation-top row">
                <div>
                  <span>展示路径：{{showPath}}同事的中国论文合作者</span>
                  <p>注：同领域的范围定为同期刊发文学者</p>
                </div>
              </div>
              <div class="row relation-echart" v-if="haveData" >
                <el-table :data="tableData5" border style="width: 100%" :row-class-name="tableRowClassName">
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="org" label="机构"></el-table-column>
                  <el-table-column prop="Email" label="邮箱"></el-table-column>
                </el-table>
              </div>
              <div v-else class="none">无符合此条件学者</div>
            </div>
          </div>

      </div>
      <div class="home-body row MT_50" v-if="searchShow">
        <div class="home-body-relation">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：{{showPath}}同领域中国学者</span>
              </div>
            </div>
            <div class="row relation-echart" v-if="haveData">
              <el-table :data="tableData3" border style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="org" label="机构"></el-table-column>
                <el-table-column prop="Email" label="邮箱"></el-table-column>
              </el-table>
            </div>
            <div v-else class="none">无符合此条件学者</div>
          </div>
        </div>
      </div>
      <!-- <i class="el-icon-bottom" v-if="searchShow"></i> -->
    </div>

    <el-dialog title="查询" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-table :data="tableData4" border style="width: 100%">
        <el-table-column prop="oData.Name" label="姓名"></el-table-column>
        <el-table-column prop="oData.Organization" label="机构"></el-table-column>
        <el-table-column prop="oData.Email" label="邮箱"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import figureChart from '@/components/Charts/figureChart'
import $ from 'jquery'
export default {
  name: 'home',
  components: {
    figureChart
  },
  data () {
    return {
      searchShow: false, // 是否第一次查询
      name: 'zhuang,yueting', // 姓名
      org: 'zhejiang univ', // 机构
      showPath: '', // 路径
      figureData1: {}, // 图表数据
      figureData2: {}, // 图表数据
      figureData3: {}, // 图表数据
      haveData: true,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      i: 0,
      dialogVisible: false,
      loading: false // 加载判断
    }
  },
  methods: {
    // 搜索
    search () {
      if (!this.name) {
        this.$message('请输入查询姓名')
        return
      }
      if (!this.org) {
        this.$message('请输入查询机构')
        return
      }
      this.haveData = true
      this.loading = true
      this.searchShow = true
      this.showPath = this.name + '(' + this.org + ')'

      let data = this.assemblyData(this.name, this.org)
      let p1 = this.getPid(data)
      let temp1 = {
        type: '5',
        p1: p1
      }
      let temp2 = {
        type: '6',
        p1: p1
      }
      let temp3 = {
        type: '7',
        p1: p1
      }
      this.getData(temp1, 5)
      this.getData(temp2, 6)
      this.getData(temp3, 7)
    },
    // 组装数据
    assemblyData (name, org) {
      let type, data
      if (name && org) {
        type = '3'
      } else if (!name && org) {
        type = '2'
      } else if (name && !org) {
        type = '1'
      }
      switch (type) {
        case '1':
          data = {
            type: type,
            s_name: name
            // s_name: 'pan,yunhe'
          }
          break
        case '2':
          data = {
            type: type,
            s_org: org
            // s_org: 'chinese acad engn'
          }
          break
        case '3':
          data = {
            type: type,
            s_name: name,
            s_org: org
            // s_name: 'zheng,wenjiang',
            // s_org: 'chinese acad engn, ctr strateg studies, beijing, peoples r china'
          }
          break
        default:
          data = {
            type: type,
            s_name: name,
            s_org: org
          }
          break
      }
      return data
    },
    // 获取数据
    getData (data, type) {
      let that = this
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_db',
        data: data,
        dataType: 'json',
        success: function (res) {
          if (type === 5) {
            let nodes = []
            let lines = []
            that.tableData1 = []
            res.data.forEach((item, index) => {
              if (index) {
                if (item.oClass === 'Organization') {
                  nodes.push({
                    name: item.oData.Name + index,
                    category: 1,
                    draggable: true
                  })
                } else if (item.oClass === 'Expert') {
                  nodes.push({
                    name:
                      item.oData.Name +
                      '\n' +
                      '(' +
                      item.oData.Organization +
                      ')' +
                      index,
                    category: 2,
                    draggable: true
                  })
                }
                lines.push({
                  source: 0,
                  rid: item.rid.cluster + item.rid.position,
                  target: index,
                  value: '合作关系'
                })
              } else {
                nodes.push({
                  name:
                    item.oData.Name +
                    '\n' +
                    '(' +
                    item.oData.Organization +
                    ')' +
                    index,
                  category: 0,
                  draggable: true
                })
              }
              that.tableData1.push({
                texttype: item.texttype,
                Email: item.oData.Email,
                name: item.oData.Name,
                org: item.oData.Organization
              })
            })
            let time = setInterval(() => {
              that.i++
              that.tableData1.push({
                texttype: 'zju',
                Email: '123',
                name: '123',
                org: '123'
              })
              if (that.i === 5) {
                clearInterval(time)
              }
            }, 1000)

            that.figureData1 = Object.assign({}, that.figureData1, {
              nodes: nodes,
              lines: lines
            })
          }

          if (type === 6) {
            let nodes = []
            let lines = []
            that.tableData2 = []
            that.tableData5 = []
            res.data.forEach((item, index) => {
              if (index) {
                if (item.oClass === 'Organization') {
                  nodes.push({
                    name: item.oData.Name + index,
                    category: 1,
                    draggable: true
                  })
                } else if (item.oClass === 'Expert') {
                  nodes.push({
                    name:
                      item.oData.Name +
                      '\n' +
                      '(' +
                      item.oData.Organization +
                      ')' +
                      index,
                    category: 2,
                    draggable: true
                  })
                }
                lines.push({
                  source: 0,
                  target: index,
                  value: ''
                })
              } else {
                nodes.push({
                  name:
                    item.oData.Name +
                    '\n' +
                    '(' +
                    item.oData.Organization +
                    ')' +
                    index,
                  category: 0,
                  draggable: true
                })
              }
              that.tableData2.push({
                texttype: item.texttype,
                Email: item.oData.Email,
                name: item.oData.Name,
                org: item.oData.Organization
              })
            })
            that.tableData5 = res.coauthorsdata.map(it => {
              return {
                texttype: it.texttype,
                Email: it.oData.Email,
                name: it.oData.Name,
                org: it.oData.Organization
              }
            })

            that.figureData2 = Object.assign({}, that.figureData2, {
              nodes: nodes,
              lines: lines
            })
          }
          if (type === 7) {
            let nodes = []
            let lines = []
            that.tableData3 = []
            res.data.forEach((item, index) => {
              if (index) {
                if (item.oClass === 'Organization') {
                  nodes.push({
                    name: item.oData.Name + index,
                    category: 1,
                    draggable: true
                  })
                } else if (item.oClass === 'Expert') {
                  nodes.push({
                    name:
                      item.oData.Name +
                      '\n' +
                      '(' +
                      item.oData.Organization +
                      ')' +
                      index,
                    category: 2,
                    draggable: true
                  })
                }
                lines.push({
                  source: 0,
                  target: index,
                  value: ''
                })
              } else {
                nodes.push({
                  name:
                    item.oData.Name +
                    '\n' +
                    '(' +
                    item.oData.Organization +
                    ')' +
                    index,
                  category: 0,
                  draggable: true
                })
              }
              that.tableData3.push({
                texttype: item.texttype,
                Email: item.oData.Email,
                name: item.oData.Name,
                org: item.oData.Organization
              })
            })
            that.loading = false
            that.figureData3 = Object.assign({}, that.figureData3, {
              nodes: nodes,
              lines: lines
            })
          }
        }
      })
    },
    // 获取坐标
    getPid (data) {
      let temp
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_db',
        data: data,
        dataType: 'json',
        async: false,
        success: function (res) {
          temp = res
        }
      })
      if (!temp.data.length) {
        this.haveData = false
        this.$message('无有效合作关系信息！')
        this.loading = false
        return
      }
      return '#' + temp.data[0].rid.cluster + ':' + temp.data[0].rid.position
    },
    // 查询
    query (data) {
      this.loading = true
      let that = this
      let ass = this.assemblyData(data.name, data.org)
      let p1 = this.getPid(ass)
      let temp = {
        type: '5',
        p1: p1
      }
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_db',
        data: temp,
        dataType: 'json',
        success: function (res) {
          that.dialogVisible = true
          that.tableData4 = res.data
          that.loading = false
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.texttype === 'zju') {
        return 'row-red'
      } else if (row.texttype === 'chinese') {
        return 'row-highlighted'
      }
      return ''
    }
  },
  mounted () {
    this.search()
  },
  watch: {}
}
</script>

<style lang="scss">
.home {
  .home-header {
    width: 1000px;
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    .el-divider--horizontal {
      margin-top: 0 !important;
    }
    .home-header-search {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 24px;
      .el-input {
        width: 250px;
      }
      span {
        width: 70px;
      }
    }
  }
  .el-icon-bottom {
    font-size: 4em;
    margin-left: 48%;
  }
  .home-body {
    margin-bottom: 40px;
    .home-body-info {
      width: 700px;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      .el-divider--horizontal {
        margin-top: 0 !important;
      }
      .info-experts {
        flex-wrap: wrap;
        margin-bottom: 44px;
        margin-right: 1%;
        .info-expert {
          width: 32%;
          margin-left: 1%;
          text-align: center;
          img {
            width: 150px;
            height: 200px;
          }
          .expert-text {
            text-align: center;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .detail-info {
        flex-wrap: wrap;
        img {
          width: 150px;
          height: 200px;
        }
        .info-content {
          max-width: 320px;
          .content-tag {
            flex-wrap: wrap;
          }
        }
      }
    }
    .home-body-relation {
      min-height: 200px;
      width: 33%;
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
        .row-red{
          color: red;
        }.row-highlighted{
          background: #F8F8FF;
        }
      }
      .none {
        margin-top: 50px;
        text-align: center;
      }
    }
  }
}
</style>
