<template>
  <div class="layer">
    <div class="home" v-loading='loading'>
      <div class="home-header MT_50">
        <el-divider content-position="left">学者联系路径发现</el-divider>
        <div class="home-header-search PR_20 PL_20">
          <span>人名</span>
          <el-input class="ML_30" v-model="name" placeholder="请输入姓名"></el-input>
          <span class="ML_30">机构</span>
          <el-input class="ML_30" v-model="org" placeholder="请输入机构"></el-input>
          <el-button class="ML_30" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-link :underline="false" class="ML_30" @click="seniorSearch = !seniorSearch">高级搜索</el-link>
        </div>
        <div class="home-header-search PR_20 PL_20" v-if="seniorSearch">
          <span >起点人名</span>
          <el-input v-model="startName" class="ML_30" placeholder="请输入姓名"></el-input>
          <span class="ML_30">机构</span>
          <el-input v-model="startOrg" class="ML_30" placeholder="请输入机构"></el-input>
        </div>
      </div>
      <div class="home-msg MT_50">
        <span style="color:red" v-if="experts.length > 10">当前查询到的结果较多，您可以通过输入机构进行筛选</span>
      </div>
      <div class="home-body row MT_50" v-if="searchShow">
        <div class="home-body-info MR_50">
          <el-divider content-position="left">学者信息</el-divider>
          <div class="info-experts row   PL_20" v-if="typeInfo === 1">
          <div class="info-expert PR_20 MT_20 " v-for="(item, index) in experts.slice(0,9)" :key='index' >
            <img src='http://expert.ckcest.cn/autoload/images/avatar.png'  @click="detail()"/>
            <!-- <img src="static/img/common/exp.png" > -->
            <div class="expert-text column">
              <span :title="item.Name">{{item.Name}}</span>
              <span :title="item.Organization.split(',')[0]">{{item.Organization.split(',')[0]}}</span>
              </div>
            </div>
          </div>
          <div class="expert-detail MT_20 ML_20 MR_20" v-else>
            <div class="detail-info row">
              <!-- <img src="static/img/common/exp.png" class="MT_20 " > -->
              <img src='http://expert.ckcest.cn/autoload/images/avatar.png'  class="MT_20 " />
              <div class="info-content ML_20">
                <p>李兰娟  浙江大学 院士</p>
                <p>KID：1723658326</p>
                <p>ISNI：0000-0004-7262-7363</p>
                <p>研究方向</p>
                <div class="row content-tag">
                  <el-tag type="info"  class="ML_20 MT_20" v-for="item in 10" :key='item'>标签四</el-tag>
                </div>
              </div>
            </div>
            <div class="detail-intr MT_20 ">
              <span>学者简介</span>
              <p>孙优贤 (1940.12.23-- ) 工业自动化专家。浙江省诸暨市人。1964年毕业于浙江大学。浙江大学教授，浙江大学现代控制工程研究所所长，浙江大学工业自动化国家工程研究中心主任。国际自控联制浆造纸委员会副主席，中国自动化学会副理事长，中国仪器仪表协会副理事长。在现代控制工程领域取得重大研究成果。针对复杂工业系统的高度不确定性、高度非线性、高度关联性、特大纯滞后和信息不完全性等特点，创造性地提出了一整套系统建模技术、先进控制技术、在线优化技术、故障诊断技术、容错控制技术、系统集成技术和综合自动化技术，并在大型工业装置中得到成功应用，初步建立了现代控制工程的方法论体系。领导建立了我国第一个国家工程研究中心，创造性地解决了制浆、造纸、生物化工等大型生产线计算机控制系统软件总体设计中的重大关键技术，成功地研制了Supcon 集散控制系统、现场总线控制系统、Suny TDCS9200工业控制计算机系统，以及综合自动化系统的硬件平台和软件平台，并实现了产业化，在制浆造纸、生物化工自动化工程领域，针对大型企业的各个生产过程，建立了24种动态数学模型，开发了25种高级控制算法，18种计算机控制系统，研制了6种造纸专用仪表和12个软测量软件，并在20多个省市推广应用，取得了重大的经济效益。获得国家科技进步二、三等各1项，国家教学成果奖2项，省部级科技进步一、二等奖15项。1995年当选为中国工程院院士。</p>
            </div>
            <div class="detail-chart">
              <FoldBarChart :foldList="foldList || {}" style="-webkit-filter: saturate(0.5);filter: saturate(0.5);"></FoldBarChart>
            </div>
          </div>
        </div>

        <div class="home-body-relation ">
            <el-divider content-position="left">合作关系</el-divider>
            <div class="relation-none" v-if="!treeData">
              <span>暂无合作关系</span>
            </div>
            <div v-else class="PL_50 PR_50">
              <div class="relation-top row ">
                 <div>
                  <span>展示路径：</span>
                  <span v-for='(item, index) in showPath' :key='index' @click='clkPath(index)'>{{index > 0 ?'->':''}}{{item.name}} {{item.org?'('+ item.org +')':''}}</span>
                 </div>
                 <el-link icon="el-icon-circle-plus" :underline="false" @click="isNode = !isNode">添加节点 </el-link>
              </div>
              <div class="relation-node row MT_30" v-if="isNode">
                <span>节点人名</span>
                <el-input v-model="nodeName" placeholder="姓名"></el-input>
                <span>节点机构</span>
                <el-input v-model="nodeOrg" placeholder="机构"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="nodeSearch" class="ML_10">搜索</el-button>
              </div>
              <div class="row relation-echart">
                <TreeChart style="width:100%" :treeData='treeData' :left='left' class="MT_30" @name='clkName'></TreeChart>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { search } from '@/api/home'
import FoldBarChart from '@/components/Charts/FoldBarChart'
import TreeChart from '@/components/Charts/TreeChart'
import $ from 'jquery'
import { makeGraphData } from '@/utils/makeGraphData'
export default {
  name: 'home',
  components: {
    FoldBarChart,
    TreeChart
  },
  data () {
    return {
      searchShow: false, // 是否第一次查询
      name: '', // 姓名
      org: '', // 机构
      startName: '', // 起点姓名
      startOrg: '', // 起点机构
      nodeName: '', // 节点姓名
      nodeOrg: '', // 节点机构
      experts: [], // 专家列表
      typeInfo: 1, // info类型
      foldList: {}, // 图表数据
      showPath: [],
      left: '20%',
      treeData: {},
      isNode: false,
      seniorSearch: false,
      loading: false // 加载判断
    }
  },
  methods: {
    // 搜索
    search () {
      if (!this.name && !this.org) {
        this.$message('必须输入其中一个关键词！')
        return
      }
      this.loading = true
      this.searchShow = true
      this.typeInfo = 1
      this.showPath = []
      let name = this.name || ''
      let org = this.org || ''
      let path = {
        name: name,
        org: org
      }
      this.showPath.push(path)
      if (this.startOrg || this.startName) {
        let data = this.assemblyData(this.name, this.org)
        let p1 = this.getPid(data)
        let data2 = this.assemblyData(this.startName, this.startOrg)
        let p2 = this.getPid(data2)
        let temp = {
          type: '4',
          p1: p1,
          p2: p2
        }
        let name = this.startName || ''
        let org = this.startOrg || ''
        let path = {
          name: name,
          org: org
        }
        this.showPath.push(path)
        this.getData(temp)
      } else {
        let data = this.assemblyData(this.name, this.org)
        this.getData(data)
      }
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
    getData (data) {
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
            that.experts = []
            res.data.forEach((item, index) => {
              if (item.oClass === 'Expert') {
                that.experts.push(item.oData)
              }
            })
            let temp = makeGraphData(res)
            let template = {
              show: true,
              formatter: '{b0}'
            }
            if (!Object.keys(temp).length || that.experts.length !== temp.children.length) {
              console.log(1)

              let children = []
              res.data.forEach((item, index) => {
                if (item.oClass === 'Expert') {
                  let exp = {
                    label: template,
                    value: 'exp',
                    index: index,
                    collapsed: false,
                    id: '#' + item.rid.cluster + ':' + item.rid.position,
                    name: item.oData.Name
                  }
                  children.push(exp)
                }
              })
              that.treeData = {
                name: that.name,
                id: '#' + res.data[0].rid.cluster + ':' + res.data[0].rid.position,
                children: children
              }
              return
            }
            temp.children.forEach((item, index) => {
              if (item === undefined) {
                temp.children.splice(index, 1)
              }
            })
            temp.value = 'org'
            temp.label = template
            temp.collapsed = false
            temp.index = 0
            temp.children.forEach((item, index) => {
              temp.children[index].label = template
              temp.children[index].value = item.children.length ? 'org' : 'exp'
              temp.children[index].index = index
              temp.children[index].collapsed = false
            })

            let tree = {
              name: that.name,
              id: '#' + res.data[0].rid.cluster + ':' + res.data[0].rid.position,
              children: []
            }
            tree.children[0] = temp
            that.treeData = tree
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
      if (!Object.keys(temp).length) {
        return '#' + temp.data[0].rid.cluster + ':' + temp.data[0].rid.position
      } else {
        return makeGraphData(temp).id
      }
    },
    detail () {
      this.typeInfo = 2
    },
    // 点击图表姓名
    clkName (name) {
      console.log(name)
      let that = this
      let data = {
        type: '1',
        s_name: name
      }
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.197/graph_db',
        data: data,
        dataType: 'json',
        success: function (res) {
          that.loading = false
          if (!res.data.length) {
            that.$message('无有效合作关系信息！')
            that.searchShow = false
          } else {
            let temp = makeGraphData(res)
            let experts = []
            res.data.forEach((item, index) => {
              if (item.oClass === 'Expert') {
                experts.push(item.oData)
              }
            })
            let template = {
              show: true,
              formatter: '{b0}'
            }
            if (!Object.keys(temp).length || experts.length !== temp.children.length) {
              let children = []
              res.data.forEach((item, index) => {
                if (item.oClass === 'Expert') {
                  let exp = {
                    label: template,
                    value: 'exp',
                    index: index,
                    collapsed: false,
                    id: '#' + item.rid.cluster + ':' + item.rid.position,
                    name: item.oData.Name
                  }
                  children.push(exp)
                }
              })
              that.treeData = {
                name: that.name,
                id: '#' + res.data[0].rid.cluster + ':' + res.data[0].rid.position,
                children: children
              }
              return
            }
            temp.children.forEach((item, index) => {
              if (item === undefined) {
                temp.children.splice(index, 1)
              }
            })
            temp.children.forEach((item, index) => {
              if (item === undefined) {
                temp.children.splice(index, 1)
              }
            })
            temp.value = 'org'
            temp.label = template
            temp.collapsed = false
            temp.index = 0
            temp.children.forEach((item, index) => {
              temp.children[index].label = template
              temp.children[index].value = item.children.length ? 'org' : 'exp'
              temp.children[index].index = index
              temp.children[index].collapsed = false
            })

            let tree = {
              name: data.s_name,
              children: []
            }
            tree.children[0] = temp
            that.treeData = tree
            // that.experts = []
            // res.data.forEach((item, index) => {
            //   if (item.oClass === 'Expert') {
            //     that.experts.push(item.oData)
            //   }
            // })
            that.typeInfo = 2
            that.showPath.push({name: name})
          }
        }
      })
    },
    // 点击路径
    clkPath (index) {
      let temp = this.showPath[index]
      this.showPath.splice(index + 1, this.showPath.length - index)
      let data = this.assemblyData(temp.name, temp.org)
      this.getData(data)
    },
    // 添加节点
    nodeSearch () {
      if (this.nodeName || this.nodeOrg) {
        let p1 = this.treeData.id
        let data = this.assemblyData(this.nodeName, this.nodeOrg)
        let p2 = this.getPid(data)
        let temp = {
          type: '4',
          p1: p1,
          p2: p2
        }
        this.getData(temp)
        let name = this.nodeName || ''
        let org = this.nodeOrg || ''
        let path = {
          name: name,
          org: org
        }
        this.showPath.push(path)
      } else {
        this.$message('必须输入其中一个关键词！')
      }
    }
  },
  mounted () {
  },
  watch: {
    seniorSearch: {
      deep: true,
      handler (val) {
        this.startName = ''
        this.startOrg = ''
      }
    },
    isNode: {
      deep: true,
      handler (val) {
        this.nodeOrg = ''
        this.nodeName = ''
      }
    }
  }
}
</script>

<style lang="scss">
.home{
  .home-header{
    width: 1000px;
    border-left:1px solid #DCDFE6;
    border-right:1px solid #DCDFE6;
    border-bottom:1px solid #DCDFE6;
    .el-divider--horizontal{
      margin-top: 0 !important;
    }
    .home-header-search{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 24px;
      .el-input{
        width: 250px;
      }
      span{
        width: 70px;
      }

    }
  }
  .home-body{
    .home-body-info{
        width: 700px;
        border-left:1px solid #DCDFE6;
        border-right:1px solid #DCDFE6;
        border-bottom:1px solid #DCDFE6;
        .el-divider--horizontal{
          margin-top: 0 !important;
        }
        .info-experts{
          flex-wrap:wrap;
          margin-bottom: 44px;
          .info-expert{
            img{
              width: 150px;
              height: 200px;
            }
            .expert-text{
              text-align: left;
              span{
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
        .detail-info{
          flex-wrap: wrap;
          img{
             width: 150px;
             height: 200px;
          }
          .info-content{
            max-width: 320px;
            .content-tag{
              flex-wrap: wrap;
            }
          }
        }
    }
    .home-body-relation{
        width: 1000px;
        border-left:1px solid #DCDFE6;
        border-right:1px solid #DCDFE6;
        border-bottom:1px solid #DCDFE6;
        .el-divider--horizontal{
          margin-top: 0 !important;
        }
        .relation-none{
          display: flex;
          span{
            margin: auto;
          }
        }
      .relation-top{
        justify-content: space-between;
      }
      .relation-node{
        width: 80%;
        margin-left: 20%;
        justify-content: space-between;
        align-items: center;
        .el-input{
          width: 25%;
        }
      }
      .relation-echart{
         justify-content: space-between;
      }
    }
  }
}
</style>
