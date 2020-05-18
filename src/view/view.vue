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
        <!-- <tableTem
          index="3"
          :tableData="tableData3"
          :tip="tip"
          @moreData="moreData"
          class="tableTem"
          :showPath="showPath"
          lable="论文合作学者"
        ></tableTem>-->
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
      paparData: {},
      collData: {},
      fieldData: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
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
        ids: [{ id: this.id, link: this.name }]
      })

      this.collData[0] = this.getData({
        type: 6,
        p1: this.p1
      })

      this.fieldData[0] = this.getData({
        type: 7,
        p1: this.p1
      })
      // let paparTitle = {
      //   title: '论文合作者',
      //   isPath: true,
      //   linkinfo: '论文合作者'
      // }
      // let collTitle = {
      //   title: '同事',
      //   isPath: true,
      //   linkinfo: '同事'
      // }
      // let fieldTitle = {
      //   title: '同领域中国学者',
      //   isPath: true,
      //   linkinfo: '同领域中国学者'
      // }
      let papar = []
      papar = papar.concat(
        this.paparData[0].zjudata,
        this.paparData[0].chinadata,
        this.paparData[0].autodata
      )
      let paparMore = []
      // if (papar.length > 30) {
      //   paparMore = {
      //     more: true,
      //     type: 'papar',
      //     size: 30
      //   }
      // }
      let collMore = []
      // if (this.collData[0].data.length > 30) {
      //   collMore = {
      //     more: true,
      //     type: 'coll',
      //     size: 30
      //   }
      // }
      let fieldMore = []
      // if (this.fieldData[0].data.length > 30) {
      //   fieldMore = {
      //     more: true,
      //     type: 'field',
      //     size: 30
      //   }
      // }

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
        // paparTitle,
        // papar.slice(0, 30),
        this.paparData[0].zjudata,
        zjudata,
        this.paparData[0].chinadata,
        chinadata,
        this.paparData[0].autodata,
        autodata
        // paparMore,
        // // collTitle,
        // this.collData[0].data,
        // // this.collData[0].data.slice(0, 30),
        // collMore,
        // // fieldTitle,
        // this.fieldData[0].data,
        // // this.fieldData[0].data.slice(0, 30),
        // fieldMore
      )
      this.getTableData2()
    },
    getTableData2 () {
      let paparData = []
      paparData = paparData.concat(
        this.paparData[0].zjudata,
        this.paparData[0].chinadata,
        this.paparData[0].autodata
      )
      let paparIds = paparData.map(it => {
        return {
          id: it.oData.Id,
          link: it.linkinfo
        }
      })
      this.paparData[1] = this.getData({
        type: 15,
        ids: paparIds
      })

      let fieldIds = this.fieldData[0].data.map(it => {
        return {
          id: it.oData.Id,
          link: this.name + '-----' + it.oData.Name
        }
      })
      this.fieldData[1] = this.getData({
        type: 15,
        ids: fieldIds
      })
      // let paparTitle = {
      //   title: '论文合作者的论文合作者',
      //   isPath: true,
      //   linkinfo: '论文合作者的论文合作者'
      // }
      // let collTitle = {
      //   title: '同事的论文合作者',
      //   isPath: true,
      //   linkinfo: '同事的论文合作者'
      // }
      this.collData[0].coauthorsdata.forEach((item, index) => {
        this.collData[0].coauthorsdata[index].linkinfo =
          this.name + '-----' + item.oData.Name
      })
      // let fieldTitle = {
      //   title: '同领域中国学者的论文合作者',
      //   isPath: true,
      //   linkinfo: '同领域中国学者的论文合作者'
      // }
      // let papar = []
      // let field = []
      // papar = papar.concat(
      //   this.paparData[1].zjudata,
      //   this.paparData[1].chinadata,
      //   this.paparData[1].autodata
      // )
      // field = field.concat(
      //   this.fieldData[1].zjudata,
      //   this.fieldData[1].chinadata,
      //   this.fieldData[1].autodata
      // )

      // let paparMore = []
      // // if (papar.length > 30) {
      // //   paparMore = {
      // //     more: true,
      // //     type: 'papar',
      // //     size: 30
      // //   }
      // // }
      // let collMore = []
      // // if (this.collData[0].coauthorsdata.length > 30) {
      // //   collMore = {
      // //     more: true,
      // //     type: 'coll',
      // //     size: 30
      // //   }
      // // }
      // let fieldMore = []
      // // if (field.length > 30) {
      // //   fieldMore = {
      // //     more: true,
      // //     type: 'field',
      // //     size: 30
      // //   }
      // // }
      // this.tableData2 = this.tableData2.concat(
      //   // paparTitle,
      //   // papar.slice(0, 30),
      //   papar,
      //   paparMore,
      //   // collTitle,
      //   this.collData[0].coauthorsdata,
      //   // this.collData[0].coauthorsdata.slice(0, 30),
      //   collMore,
      //   // fieldTitle,
      //   field,
      //   // field.slice(0, 30),
      //   fieldMore
      // )
      this.getTableData3()
    },
    getTableData3 () {
      let paparData = []
      paparData = paparData.concat(
        this.paparData[1].zjudata,
        this.paparData[1].chinadata,
        this.paparData[1].autodata
      )
      let paparIds = paparData.map(it => {
        return {
          id: it.oData.Id,
          link: it.linkinfo
        }
      })
      this.paparData[2] = this.getData({
        type: 15,
        ids: paparIds
      })

      let collIds = this.collData[0].coauthorsdata.map(it => {
        return {
          id: it.oData.Id,
          link: this.name + '-----' + it.oData.Name
        }
      })
      this.collData[1] = this.getData({
        type: 15,
        ids: collIds
      })
      // let paparTitle = {
      //   title: '论文合作者的论文合作者的论文合作者',
      //   isPath: true,
      //   linkinfo: '论文合作者的论文合作者的论文合作者'
      // }
      // let collTitle = {
      //   title: '同事的论文合作者的论文合作者',
      //   isPath: true,
      //   linkinfo: '同事的论文合作者的论文合作者'
      // }
      // let papar = []
      // let coll = []
      // papar = papar.concat(
      //   this.paparData[2].zjudata,
      //   this.paparData[2].chinadata,
      //   this.paparData[2].autodata
      // )
      // coll = coll.concat(
      //   this.collData[1].zjudata,
      //   this.collData[1].chinadata,
      //   this.collData[1].autodata
      // )
      // let paparMore = []
      // let collMore = []

      // if (papar.length > 30) {
      //   paparMore = {
      //     more: true,
      //     type: 'papar',
      //     size: 30
      //   }
      // }
      // if (coll.length > 30) {
      //   collMore = {
      //     more: true,
      //     type: 'coll',
      //     size: 30
      //   }
      // }
      let zjudata = []
      let chinadata = []
      let autodata = []
      this.collData[0].coauthorsdata.forEach((item, index) => {
        if (item.texttype === 'zju') {
          zjudata.push(item)
        } else if (item.texttype === 'auto') {
          autodata.push(item)
        } else if (item.texttype === 'chinese') {
          chinadata.push(item)
        }
      })

      this.tableData2 = this.tableData2.concat(
        this.paparData[1].zjudata,
        zjudata,
        this.fieldData[1].zjudata,
        this.paparData[2].zjudata,
        this.collData[1].zjudata,

        this.paparData[1].chinadata,
        chinadata,
        this.fieldData[1].chinadata,
        this.paparData[2].chinadata,
        this.collData[1].chinadata,

        this.paparData[1].autodata,
        autodata,
        this.fieldData[1].autodata,
        this.paparData[2].autodata,
        this.collData[1].autodata
        //   this.paparData[2].chinadata,
        //   this.paparData[2].autodata
        // paparTitle,
        // papar.slice(0, 30),
        // papar,
        // paparMore,
        // // collTitle,
        // coll,
        // // coll.slice(0, 30),
        // collMore
      )
      this.loading = false
    },
    moreData (data) {
      if (data.index === '1') {
      } else if (data.index === '2') {
        this.tableData2 = []
      } else if (data.index === '3') {
      }
    },
    // addTableData1 () {
    //   let papar = []
    //   papar = papar.concat(
    //     this.paparData[0].zjudata,
    //     this.paparData[0].chinadata,
    //     this.paparData[0].autodata
    //   )
    //   let paparMore = []
    //   if (papar.length > 30) {
    //     paparMore = {
    //       more: true,
    //       type: 'papar',
    //       size: 30
    //     }
    //   }
    //   let collMore = []
    //   if (this.collData[0].data.length > 30) {
    //     collMore = {
    //       more: true,
    //       type: 'coll',
    //       size: 30
    //     }
    //   }
    //   let fieldMore = []
    //   if (this.fieldData[0].data.length > 30) {
    //     fieldMore = {
    //       more: true,
    //       type: 'field',
    //       size: 30
    //     }
    //   }
    //   this.tableData1 = this.tableData1.concat(
    //     paparTitle,
    //     papar.slice(0, 30),
    //     paparMore,
    //     collTitle,
    //     this.collData[0].data.slice(0, 30),
    //     collMore,
    //     fieldTitle,
    //     this.fieldData[0].data.slice(0, 30),
    //     fieldMore
    //   )
    // },
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
