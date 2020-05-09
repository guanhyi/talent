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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="论文合作学者" name="first">
          <span>说明：</span>
          <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
          <p>同领域学者：与查询学者在同期刊上发文的学者</p>
          <div class="home-body row MT_50" v-if="searchShow">
            <tableTem
              :tableData="tableData[0]"
              class="tableTem"
              :showPath="showPath"
              lable='论文合作学者'
              :haveData="haveData"
            ></tableTem>
            <tableTem
              :tableData="tableData[1]"
              class="tableTem"
              lable='论文合作者的合作者'
              :showPath="showPath"
              :haveData="haveData"
            ></tableTem>
          </div>
        </el-tab-pane>
        <el-tab-pane label="同事" name="second">
                    <span>说明：</span>
          <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
          <p>同领域学者：与查询学者在同期刊上发文的学者</p>
          <div class="home-body row MT_50" v-if="searchShow">
            <tableTem
              :tableData="tableData[2]"
              :serach="isSeach"
              @query="query"
              lable='的同事'
              class="tableTem"
              :showPath="showPath"
              :haveData="haveData"
            ></tableTem>
            <tableTem
              :tableData="tableData[4]"
              class="tableTem"
              lable='的同事的论文合作者'
              :showPath="showPath"
              :haveData="haveData"
            ></tableTem>
            <tableTem
              :tableData="tableData[3]"
              class="tableTem"
              lable='的同事的论文合作者的合作者'
              :showPath="showPath"
              :haveData="haveData"
            ></tableTem>
          </div>
        </el-tab-pane>
        <el-tab-pane label="同领域中国学者" name="third">
                    <span>说明：</span>
          <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
          <p>同领域学者：与查询学者在同期刊上发文的学者</p>
          <div class="home-body row MT_50" v-if="searchShow">
            <tableTem
              :tableData="tableData[5]"
              class="tableTem"
              lable='的同领域学者'
              :showPath="showPath"
              :haveData="haveData"
            ></tableTem>
            <tableTem
              :tableData="tableData[6]"
              class="tableTem"
              lable='的同领域学者的合作者'
              :showPath="showPath"
              :haveData="haveData"
            ></tableTem>
          </div>
        </el-tab-pane>

      </el-tabs>

      <!-- <i class="el-icon-bottom" v-if="searchShow"></i> -->
    </div>

    <el-dialog title="查询" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-table :data="tableData[7]" border style="width: 100%">
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
import tableTem from '@/components/common/tableTem'
import $ from 'jquery'
export default {
  name: 'home',
  components: {
    figureChart,
    tableTem
  },
  data () {
    return {
      activeName: 'first',
      isSeach: true,
      searchShow: false, // 是否第一次查询
      name: 'zhuang,yueting', // 姓名
      org: 'zhejiang univ', // 机构
      showPath: '', // 路径
      figureData: {},
      p1: '',
      list: {},
      haveData: true,
      tableData: {},
      times: {},
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
      this.activeName = 'first'
      let data = this.assemblyData(this.name, this.org)
      this.p1 = this.getPid(data)
      let temp1 = {
        type: '5',
        p1: this.p1
      }
      this.getData(temp1, 0)
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
      that.tableData[type] = []
      that.tableData[1] = []
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_db',
        data: data,
        dataType: 'json',
        success: function (res) {
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
            that.tableData[type].push({
              texttype: item.texttype,
              Email: item.oData.Email,
              name: item.oData.Name,
              org: item.oData.Organization,
              path: that.name + '-' + item.oData.Name
            })
          })
          if (type === 2) {
            that.tableData[4] = res.coauthorsdata.map(it => {
              return {
                texttype: it.texttype,
                Email: it.oData.Email,
                name: it.oData.Name,
                org: it.oData.Organization,
                path: that.name + '-' + it.oData.Name
              }
            })
            that.secondSearch(that.tableData[4], type + 1)
          } else {
            that.secondSearch(that.tableData[type], type + 1)
          }

          that.figureData[type] = Object.assign({}, that.figureData[type], {
            nodes: nodes,
            lines: lines
          })
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
          that.tableData[7] = res.data
          that.loading = false
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleClick (tab, event) {
      if (tab.index === '1') {
        if (!this.tableData[2].length) {
          this.loading = true
          let temp = {
            type: '6',
            p1: this.p1
          }
          this.getData(temp, 2)
        }
      } else if (tab.index === '2') {
        if (!this.tableData[5].length) {
          this.loading = true
          let temp = {
            type: '7',
            p1: this.p1
          }
          this.getData(temp, 5)
        }
      }
    },
    secondSearch (data, type) {
      let i = 0
      let list = []
      this.loading = false
      data.forEach((item, index) => {
        if (item.texttype !== 'zju') {
          let data = this.assemblyData(item.name, item.org)
          let p1 = this.getPid(data)
          $.ajax({
            type: 'post',
            url: 'http://183.136.237.195/graph_db',
            data: {
              type: '5',
              p1: p1
            },
            dataType: 'json',
            success: function (res) {
              let temp = res.data.map(it => {
                return {
                  name: it.oData.Name,
                  org: it.oData.Organization,
                  Email: it.oData.Email,
                  path: item.path + '-' + it.oData.Name,
                  texttype: it.texttype
                }
              })
              list = list.concat(temp)
            }
          })
        }
      })
      this.times[type] = setInterval(() => {
        i++
        this.tableData[type].push(list[i])
        if (i === list.length) {
          clearInterval(this.times[type])
        }
      }, 1000)
    }
  },
  mounted () {
    for (var i = 0; i < 8; i++) {
      this.tableData[i] = []
    }
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
    .tableTem {
      width: 33%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
