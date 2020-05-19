<template>
  <div class="layer">
    <div class="home">
      <div class="home-header MT_50 MB_20">
        <el-divider content-position="left">学者合作路径查询</el-divider>
        <div class="home-header-search PR_20 PL_20">
          <span>查询人名</span>
          <el-input class="ML_30" v-model="name" placeholder="必填"></el-input>
          <span class="ML_30">查询机构</span>
          <el-input class="ML_30" v-model="org" placeholder="必填"></el-input>
          <el-button
            class="ML_30"
            type="primary"
            icon="el-icon-search"
            @click="search"
            :loading="loading"
          >搜索</el-button>
          <el-checkbox v-model="checked" class="check ML_30">合作者限制为中国学者</el-checkbox>
        </div>
      </div>
      <span>说明：</span>
      <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
      <p>同领域学者：与查询学者在同期刊上发文的学者</p>
      <div class="home-body row MT_20" v-loading="loading" v-if="searchShow">
        <tableTem
          :tableData="tableData1"
          class="tableTem"
          index="1"
          :showPath="showPath"
          lable="论文合作学者"
          @moreData="moreData"
        ></tableTem>
        <tableTem
          index="2"
          :tableData="tableData2"
          :tip="tip"
          class="tableTem"
          :showPath="showPath"
          @moreData="moreData"
          lable="论文合作学者"
        ></tableTem>
        <tableTem
          index="3"
          :tableData="tableData3"
          :tip="tip"
          @moreData="moreData"
          class="tableTem"
          :showPath="showPath"
          lable="论文合作学者"
        ></tableTem>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import tableTem from '@/components/common/tableTem'
import figureChart from '@/components/Charts/figureChart'
export default {
  name: 'home',
  components: {
    figureChart,
    tableTem
  },
  data () {
    return {
      loading: false,
      tip: true,
      searchShow: false, // 是否第一次查询
      name: 'tao,yunzhe', // 姓名
      org: 'columbia univ', // 机构
      showPath: '', // 路径
      checked: false, // 模糊匹配
      p1: '',
      id: '',
      pages: [
        {page: 1},
        {page: 1},
        {page: 1}
      ],
      paparData: {},
      collData: {},
      fieldData: {},
      tableData1: [],
      locData1: [],
      tableData2: [],
      locData2: [],
      tableData3: [],
      locData3: [],
      figureData: {}
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
      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.showPath = this.name + '(' + this.org + ')'
      let data = this.getData({
        type: 3,
        s_name: this.name,
        s_org: this.org
      })
      this.p1 =
        '#' + data.data[0].rid.cluster + ':' + data.data[0].rid.position
      this.id = data.data[0].oData.Id
      setTimeout(() => {
        this.getTableData1()
      }, 1000)
    },
    // 获取数据
    getData (data) {
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

      return temp
    },
    getTableData1 () {
      this.paparData[0] = this.getData({
        type: 15,
        ids: [{ id: this.id, link: this.name }],
        l: 1,
        p0: this.id
      })
      this.collData[0] = this.getData({
        type: 6,
        p1: this.p1
      })
      this.fieldData[0] = this.getData({
        type: 7,
        p1: this.p1
      })
      let zjudata = []
      let chinadata = []
      let autodata = []
      this.collData[0].data.forEach((item, index) => {
        if (item.texttype === 'zju') {
          zjudata.push(item)
        } else if (item.texttype === 'auto') {
          autodata.push(item)
        } else if (item.texttype === 'chinese') {
          chinadata.push(item)
        }
      })
      this.fieldData[0].data.forEach((item, index) => {
        if (item.texttype === 'zju') {
          zjudata.push(item)
        } else if (item.texttype === 'auto') {
          autodata.push(item)
        } else if (item.texttype === 'chinese') {
          chinadata.push(item)
        }
      })
      this.tableData1 = this.tableData1.concat(
        this.paparData[0].zjudata,
        zjudata,
        this.paparData[0].chinadata,
        chinadata,
        this.paparData[0].autodata,
        autodata
      )
      this.locData1 = this.locData1.concat(
        this.paparData[0].zjudata,
        zjudata,
        this.paparData[0].chinadata,
        chinadata,
        this.paparData[0].autodata,
        autodata
      )
      if (this.tableData1.length > 50) {
        this.tableData1 = this.tableData1.slice(0, 50)
        this.tableData1.push({
          more: true,
          type: 'papar'
        })
      }
      if (this.tableData1.length) {
        this.getTableData2()
      } else {
        this.loading = false
      }
    },
    getTableData2 () {
      let paparData = []
      if (this.paparData[0]) {
        paparData = paparData.concat(
          this.paparData[0].zjudata,
          this.paparData[0].chinadata,
          this.paparData[0].autodata
        )
        if (paparData.length) {
          let paparIds = paparData.map(it => {
            return {
              id: it.oData.Id,
              link: it.linkinfo
            }
          })
          this.paparData[1] = this.getData({
            type: 15,
            ids: paparIds,
            l: 2,
            p0: this.id
          })
        }
      }
      if (this.fieldData[0]) {
        let fieldIds = this.fieldData[0].data.map(it => {
          return {
            id: it.oData.Id,
            link: this.name + '-----' + it.oData.Name
          }
        })
        this.fieldData[1] = this.getData({
          type: 15,
          ids: fieldIds,
          l: 2,
          p0: this.id
        })
      }
      if (this.collData[0]) {
        let collIds = this.collData[0].data.map(it => {
          return {
            id: it.oData.Id,
            link: this.name + '-----' + it.oData.Name
          }
        })
        this.collData[1] = this.getData({
          type: 15,
          ids: collIds,
          l: 2,
          p0: this.id
        })
      }
      this.locData2 = this.locData2.concat(
        this.paparData[1].zjudata,
        this.collData[1].zjudata,
        this.fieldData[1].zjudata,
        this.paparData[1].chinadata,
        this.collData[1].chinadata,
        this.fieldData[1].chinadata,
        this.paparData[1].autodata,
        this.collData[1].autodata,
        this.fieldData[1].autodata
      )
      if (this.locData2.length > 50) {
        this.tableData2 = this.locData2.slice(0, 50)
        this.tableData2.push({
          more: true,
          type: 'papar'
        })
      } else {
        this.tableData2 = this.locData2
      }
      if (this.tableData2.length) {
        this.getTableData3()
      } else {
        this.loading = false
      }
    },
    getTableData3 () {
      let paparData = []
      let collData = []
      if (this.paparData[1]) {
        paparData = paparData.concat(
          this.paparData[1].zjudata,
          this.paparData[1].chinadata,
          this.paparData[1].autodata
        )
        if (paparData) {
          let paparIds = paparData.map(it => {
            return {
              id: it.oData.Id,
              link: it.linkinfo
            }
          })
          this.paparData[2] = this.getData({
            type: 15,
            ids: paparIds,
            l: 2,
            p0: this.id
          })
        }
      }
      if (this.collData[1]) {
        collData = collData.concat(
          this.collData[1].zjudata,
          this.collData[1].chinadata,
          this.collData[1].autodata
        )
        if (collData.length) {
          let collIds = collData.map(it => {
            return {
              id: it.oData.Id,
              link: this.name + '-----' + it.oData.Name
            }
          })
          this.collData[2] = this.getData({
            type: 15,
            ids: collIds,
            l: 2,
            p0: this.id
          })
        }
      }
      this.locData3 = this.locData3.concat(
        this.paparData[2].zjudata,
        this.collData[2].zjudata,
        this.paparData[2].chinadata,
        this.collData[2].chinadata,
        this.paparData[2].autodata,
        this.collData[2].autodata
      )

      if (this.locData3.length > 50) {
        this.tableData3 = this.locData3.slice(0, 50)
        this.tableData3.push({
          more: true,
          type: 'papar'
        })
      } else {
        this.tableData3 = this.locData3
      }
      this.loading = false
    },
    moreData (data) {
      if (data.index === '1') {
        this.pages[0].page++
        this.addTableData1()
      } else if (data.index === '2') {
        this.pages[1].page++
        this.addTableData2()
      } else if (data.index === '3') {
        this.pages[2].page++
        this.addTableData3()
      }
    },
    addTableData1 () {
      this.tableData1 = this.locData1.slice(0, 50 * this.pages[0].page)
      if (this.locData1.length > 50 * this.pages[0].page) {
        this.tableData1.push({
          more: true,
          type: 'papar'
        })
      }
    },
    addTableData2 () {
      this.tableData2 = this.locData2.slice(0, 50 * this.pages[1].page)
      if (this.locData2.length > 50 * this.pages[1].page) {
        this.tableData2.push({
          more: true,
          type: 'papar'
        })
      }
    },
    addTableData3 () {
      this.tableData3 = this.locData3.slice(0, 50 * this.pages[2].page)
      if (this.locData3.length > 50 * this.pages[2].page) {
        this.tableData3.push({
          more: true,
          type: 'papar'
        })
      }
    },
    handleClick () {}
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
    width: 1100px;
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

      .check span {
        width: 14px;
        height: 14px;
      }
    }
  }
  .el-icon-bottom {
    font-size: 4em;
    margin-left: 48%;
  }
  .home-body {
    margin-bottom: 40px;

    .tableTem {
      width: 33%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
