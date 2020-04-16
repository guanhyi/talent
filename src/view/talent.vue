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
      <!-- <div class="home-msg MT_50">
        <span style="color:red" v-if="experts.length > 10">当前查询到的结果较多，您可以通过输入机构进行筛选</span>
      </div>-->
      <div class="home-body row MT_50">
        <div class="home-body-relation">
          <el-divider content-position="left">合作关系</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：同机构学者</span>

                <!-- <span v-for='(item, index) in showPath' :key='index' @click='clkPath(index)'>{{index > 0 ?'->':''}}{{item.name}} {{item.org?'('+ item.org +')':''}}</span> -->
              </div>
              <!-- <el-link icon="el-icon-circle-plus" :underline="false" @click="isNode = !isNode">添加节点 </el-link> -->
            </div>
            <div class="row relation-echart">
              <figureChart style="width:100%" :figureData="figureData1" class="MT_30"></figureChart>
            </div>
          </div>
        </div>
                <div class="home-body-relation">
          <el-divider content-position="left">合作关系</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：中国论文合作者</span>

                <!-- <span v-for='(item, index) in showPath' :key='index' @click='clkPath(index)'>{{index > 0 ?'->':''}}{{item.name}} {{item.org?'('+ item.org +')':''}}</span> -->
              </div>
              <!-- <el-link icon="el-icon-circle-plus" :underline="false" @click="isNode = !isNode">添加节点 </el-link> -->
            </div>
            <div class="row relation-echart">
              <figureChart style="width:100%" :figureData="figureData2" class="MT_30"></figureChart>
            </div>
          </div>
        </div>
                <div class="home-body-relation">
          <el-divider content-position="left">合作关系</el-divider>
          <div class="PL_50 PR_50">
            <div class="relation-top row">
              <div>
                <span>展示路径：中国同领域学者</span>

                <!-- <span v-for='(item, index) in showPath' :key='index' @click='clkPath(index)'>{{index > 0 ?'->':''}}{{item.name}} {{item.org?'('+ item.org +')':''}}</span> -->
              </div>
              <!-- <el-link icon="el-icon-circle-plus" :underline="false" @click="isNode = !isNode">添加节点 </el-link> -->
            </div>
            <div class="row relation-echart">
              <figureChart style="width:100%" :figureData="figureData3" class="MT_30"></figureChart>
            </div>
          </div>
        </div>
      </div>

    </div>
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
      showPath: [], // 路径
      figureData1: {}, // 图表数据
      figureData2: {}, // 图表数据
      figureData3: {}, // 图表数据
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
      this.loading = true
      this.searchShow = true
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
        url: 'http://183.136.237.197/graph_db',
        data: data,
        dataType: 'json',
        success: function (res) {
          that.loading = false
          if (!res.data.length) {
            that.$message('无有效合作关系信息！')
          } else {
            if (type === 5) {
              let nodes = []
              let lines = []
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
                    draggable: true
                  })
                }
              })
              that.figureData1 = Object.assign({}, that.figureData1, {
                nodes: nodes,
                lines: lines
              })
            }
            if (type === 6) {
              let nodes = []
              let lines = []
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
                    draggable: true
                  })
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
                    draggable: true
                  })
                }
              })
              that.figureData3 = Object.assign({}, that.figureData3, {
                nodes: nodes,
                lines: lines
              })
            }
            console.log(that.figureData1)
          }
        }
      })
    },
    // 获取坐标
    getPid (data) {
      let temp
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.197/graph_db',
        data: data,
        dataType: 'json',
        async: false,
        success: function (res) {
          temp = res
        }
      })
      if (!temp.data.length) {
        this.$message('无有效合作关系信息！')
        this.loading = false
        return
      }
      return '#' + temp.data[0].rid.cluster + ':' + temp.data[0].rid.position
    }
  },
  mounted () {},
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
  .home-body {
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
      width: 1000px;
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
      }
    }
  }
}
</style>
