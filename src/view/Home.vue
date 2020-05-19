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
      <div class="home-body row MT_20" v-loading='loading' v-if="searchShow">
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
      paparData: [],
      collData: [],
      fieldData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      pages: [
        {papar: 0, coll: 0, field: 0},
        {papar: 0, coll: 0, field: 0},
        {papar: 0, coll: 0, field: 0}
      ],
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
      this.searchShow = true
      this.loading = true
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
      let papar = []
      let coll = []
      let field = []
      let paparTitle = []
      let collTitle = []
      let fieldTitle = []
      let paparMore = []
      let collMore = []
      let fieldMore = []
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
      papar = papar.concat(
        this.paparData[0].zjudata,
        this.paparData[0].chinadata,
        this.paparData[0].autodata
      )
      if (papar.length) {
        paparTitle = {
          title: '论文合作者',
          isPath: true,
          linkinfo: '论文合作者'
        }
        if (papar.length > 30) {
          paparMore = {
            more: true,
            type: 'papar'
          }
        }
        this.pages[0].papar = 1
      }
      if (this.collData[0].data.length) {
        let zjudata = []
        let chinadata = []
        let autodata = []
        collTitle = {
          title: '同事',
          isPath: true,
          linkinfo: '同事'
        }
        this.collData[0].data.forEach((item, index) => {
          if (item.texttype === 'zju') {
            zjudata.push(item)
          } else if (item.texttype === 'auto') {
            autodata.push(item)
          } else if (item.texttype === 'chinese') {
            chinadata.push(item)
          }
        })
        coll = coll.concat(
          zjudata,
          chinadata,
          autodata
        )
        if (coll.length > 30) {
          collMore = {
            more: true,
            type: 'coll'
          }
        }
        this.pages[0].coll = 1
      }
      if (this.fieldData[0].data.length) {
        let zjudata = []
        let chinadata = []
        let autodata = []
        fieldTitle = {
          title: '同领域中国学者',
          isPath: true,
          linkinfo: '同领域中国学者'
        }
        this.fieldData[0].data.forEach((item, index) => {
          if (item.texttype === 'zju') {
            zjudata.push(item)
          } else if (item.texttype === 'auto') {
            autodata.push(item)
          } else if (item.texttype === 'chinese') {
            chinadata.push(item)
          }
        })
        field = field.concat(
          zjudata,
          chinadata,
          autodata
        )
        if (field.length > 30) {
          fieldMore = {
            more: true,
            type: 'field'
          }
        }
        this.pages[0].field = 1
      }
      this.tableData1 = this.tableData1.concat(
        paparTitle,
        papar.slice(0, 30),
        paparMore,
        collTitle,
        coll.slice(0, 30),
        collMore,
        fieldTitle,
        field.slice(0, 30),
        fieldMore
      )
      if (this.tableData1.length) {
        this.getTableData2()
      } else {
        this.loading = false
      }
    },
    getTableData2 () {
      let paparData = []
      let papar = []
      let field = []
      let coll = []
      let paparMore = []
      let collMore = []
      let fieldMore = []
      let paparTitle = []
      let collTitle = []
      let fieldTitle = []
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

        papar = papar.concat(
          this.paparData[1].zjudata,
          this.paparData[1].chinadata,
          this.paparData[1].autodata
        )
        if (papar.length) {
          paparTitle = {
            title: '论文合作者的论文合作者',
            isPath: true,
            linkinfo: '论文合作者的论文合作者'
          }
        }
        this.pages[1].papar = 1
        if (papar.length > 30) {
          paparMore = {
            more: true,
            type: 'papar'
          }
        }
      }
      if (this.fieldData[0].data.length) {
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

        field = field.concat(
          this.fieldData[1].zjudata,
          this.fieldData[1].chinadata,
          this.fieldData[1].autodata
        )
        if (field.length) {
          fieldTitle = {
            title: '同领域中国学者的论文合作者',
            isPath: true,
            linkinfo: '同领域中国学者的论文合作者'
          }
        }
        this.pages[1].field = 1
        if (field.length > 30) {
          fieldMore = {
            more: true,
            type: 'field'
          }
        }
      }

      if (this.collData[0].data.length) {
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
        coll = coll.concat(
          this.collData[1].zjudata,
          this.collData[1].chinadata,
          this.collData[1].autodata
        )
        if (coll.length) {
          collTitle = {
            title: '同事的论文合作者',
            isPath: true,
            linkinfo: '同事的论文合作者'
          }
        }
        this.pages[1].coll = 1
        if (coll.length > 30) {
          collMore = {
            more: true,
            type: 'coll'
          }
        }
      }
      this.tableData2 = this.tableData2.concat(
        paparTitle,
        papar.slice(0, 30),
        paparMore,
        collTitle,
        coll.slice(0, 30),
        collMore,
        fieldTitle,
        field.slice(0, 30),
        fieldMore
      )
      if (this.tableData2.length) {
        this.getTableData3()
      } else {
        this.loading = false
      }
    },
    getTableData3 () {
      let paparData = []
      let collData = []
      let papar = []
      let coll = []
      let paparMore = []
      let collMore = []
      let paparTitle = []
      let collTitle = []
      if (this.paparData[1]) {
        paparData = paparData.concat(
          this.paparData[1].zjudata,
          this.paparData[1].chinadata,
          this.paparData[1].autodata
        )
      }
      if (paparData.length) {
        let paparIds = paparData.map(it => {
          return {
            id: it.oData.Id,
            link: it.linkinfo
          }
        })
        this.paparData[2] = this.getData({
          type: 15,
          ids: paparIds,
          l: 3,
          p0: this.id
        })
        papar = papar.concat(
          this.paparData[2].zjudata,
          this.paparData[2].chinadata,
          this.paparData[2].autodata
        )
        this.pages[2].papar = 1
        if (papar.length) {
          paparTitle = {
            title: '论文合作者的论文合作者的论文合作者',
            isPath: true,
            linkinfo: '论文合作者的论文合作者的论文合作者'
          }
        }
        if (papar.length > 30) {
          paparMore = {
            more: true,
            type: 'papar'
          }
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
              link: it.linkinfo
            }
          })
          this.collData[2] = this.getData({
            type: 15,
            ids: collIds,
            l: 3,
            p0: this.id
          })
          coll = coll.concat(
            this.collData[2].zjudata,
            this.collData[2].chinadata,
            this.collData[2].autodata
          )
        }
        this.pages[2].coll = 1
        if (coll.length) {
          collTitle = {
            title: '同事的论文合作者的论文合作者',
            isPath: true,
            linkinfo: '同事的论文合作者的论文合作者'
          }
          if (coll.length > 30) {
            collMore = {
              more: true,
              type: 'coll'
            }
          }
        }
      }
      this.tableData3 = this.tableData3.concat(
        paparTitle,
        papar.slice(0, 30),
        paparMore,
        collTitle,
        coll.slice(0, 30),
        collMore
      )
      this.loading = false
    },
    moreData (data) {
      if (data.type === 'papar') {
        this.pages[parseInt(data.index) - 1].papar++
      } else if (data.type === 'coll') {
        this.pages[parseInt(data.index) - 1].coll++
      } else if (data.type === 'field') {
        this.pages[parseInt(data.index) - 1].field++
      }
      if (data.index === '1') {
        this.addTableData1(data)
      } else if (data.index === '2') {
        this.addTableData2(data)
      } else if (data.index === '3') {
        this.addTableData3(data)
      }
    },
    addTableData1 () {
      let papar = []
      let paparMore = []
      let paparTitle = []
      let coll = []
      let collTitle = []
      let collMore = []
      let field = []
      let fieldMore = []
      let fieldTitle = []
      if (this.paparData[0]) {
        papar = papar.concat(
          this.paparData[0].zjudata,
          this.paparData[0].chinadata,
          this.paparData[0].autodata
        )
        if (papar.length > 30 * this.pages[0].papar) {
          paparMore = {
            more: true,
            type: 'papar'
          }
        }
        paparTitle = {
          title: '论文合作者',
          isPath: true,
          linkinfo: '论文合作者'
        }
      }
      if (this.collData[0]) {
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
        coll = coll.concat(
          zjudata,
          chinadata,
          autodata
        )
        if (coll.length > 30 * this.pages[0].coll) {
          collMore = {
            more: true,
            type: 'coll'
          }
        }
        collTitle = {
          title: '同事',
          isPath: true,
          linkinfo: '同事'
        }
      }
      if (this.fieldData[0]) {
        let zjudata = []
        let chinadata = []
        let autodata = []
        this.fieldData[0].data.forEach((item, index) => {
          if (item.texttype === 'zju') {
            zjudata.push(item)
          } else if (item.texttype === 'auto') {
            autodata.push(item)
          } else if (item.texttype === 'chinese') {
            chinadata.push(item)
          }
        })
        field = field.concat(
          zjudata,
          chinadata,
          autodata
        )
        if (field.length > 30 * this.pages[0].field) {
          fieldMore = {
            more: true,
            type: 'field'
          }
        }
        fieldTitle = {
          title: '同领域中国学者',
          isPath: true,
          linkinfo: '同领域中国学者'
        }
      }
      this.tableData1 = []
      this.tableData1 = this.tableData1.concat(
        paparTitle,
        papar.slice(0, 30 * this.pages[0].papar),
        paparMore,
        collTitle,
        coll.slice(0, 30 * this.pages[0].field),
        collMore,
        fieldTitle,
        field.slice(0, 30 * this.pages[0].field),
        fieldMore
      )
    },
    addTableData2 (data) {
      let papar = []
      let coll = []
      let field = []
      let paparMore = []
      let paparTitle = []
      let collMore = []
      let collTitle = []
      let fieldMore = []
      let fieldTitle = []
      if (this.paparData[1]) {
        papar = papar.concat(
          this.paparData[1].zjudata,
          this.paparData[1].chinadata,
          this.paparData[1].autodata
        )
      }
      if (papar.length) {
        paparTitle = {
          title: '论文合作者',
          isPath: true,
          linkinfo: '论文合作者'
        }
        if (papar.length > 30 * this.pages[1].papar) {
          paparMore = {
            more: true,
            type: 'papar'
          }
        }
      }

      if (this.collData[1]) {
        coll = coll.concat(
          this.collData[1].zjudata,
          this.collData[1].chinadata,
          this.collData[1].autodata
        )

        if (coll.length) {
          if (coll.length > 30 * this.pages[1].coll) {
            collMore = {
              more: true,
              type: 'coll',
              size: this.pages[1].coll
            }
          }
          collTitle = {
            title: '同事的论文合作者',
            isPath: true,
            linkinfo: '同事的论文合作者'
          }
        }
      }

      if (this.fieldData[1]) {
        field = field.concat(
          this.fieldData[1].zjudata,
          this.fieldData[1].chinadata,
          this.fieldData[1].autodata
        )
      }

      if (field.length) {
        if (field.length > 30 * this.pages[1].field) {
          fieldMore = {
            more: true,
            type: 'field'
          }
        }
        fieldTitle = {
          title: '同领域中国学者',
          isPath: true,
          linkinfo: '同领域中国学者'
        }
      }
      this.tableData2 = []
      this.tableData2 = this.tableData2.concat(
        paparTitle,
        papar.slice(0, 30 * this.pages[1].papar),
        paparMore,
        collTitle,
        coll.slice(0, 30 * this.pages[1].coll),
        collMore,
        fieldTitle,
        field.slice(0, 30 * this.pages[1].field),
        fieldMore
      )
    },
    addTableData3 () {
      let papar = []
      let coll = []
      let paparMore = []
      let paparTitle = []
      let collMore = []
      let collTitle = []
      if (this.paparData[2]) {
        papar = papar.concat(
          this.paparData[2].zjudata,
          this.paparData[2].chinadata,
          this.paparData[2].autodata
        )
        if (papar.length) {
          if (papar.length > 30 * this.pages[2].papar) {
            paparMore = {
              more: true,
              type: 'papar'
            }
          }
          paparTitle = {
            title: '论文合作者的论文合作者的论文合作者',
            isPath: true,
            linkinfo: '论文合作者的论文合作者的论文合作者'
          }
        }
      }
      if (this.collData[2]) {
        coll = coll.concat(
          this.collData[2].zjudata,
          this.collData[2].chinadata,
          this.collData[2].autodata
        )
        if (coll.length) {
          if (this.collData[0].data.length > 30 * this.pages[2].coll) {
            collMore = {
              more: true,
              type: 'coll'
            }
          }
          collTitle = {
            title: '同事的论文合作者的论文合作者',
            isPath: true,
            linkinfo: '同事的论文合作者的论文合作者'
          }
        }
      }
      this.tableData3 = []
      this.tableData3 = this.tableData3.concat(
        paparTitle,
        papar.slice(0, 30 * this.pages[2].papar),
        paparMore,
        collTitle,
        coll.slice(0, 30 * this.pages[2].coll),
        collMore
      )
    },
    handleClick () {}
  },
  mounted () {
    // this.search()
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
