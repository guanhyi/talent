<template>
  <div class="layer">
    <div class="home">
      <div class="home-header">
        <el-divider content-position="left">学者合作路径查询</el-divider>
        <div class="home-header-search PR_20 PL_20">
          <span id="end">数据库</span>
          <el-select v-model="type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span id="start" class="ML_30">查询人名</span>
          <el-autocomplete
            class="ML_30"
            v-model="name"
            :fetch-suggestions="remoteMethodName"
            :placeholder="plName"
            @select="changeName"
          ></el-autocomplete>
          <span class="ML_30" id="end">查询机构</span>
          <el-autocomplete
            class="ML_30"
            v-model="org"
            :fetch-suggestions="remoteMethodOrg"
            :placeholder="plOrg"
            @select="changeOrg"
          ></el-autocomplete>
          <el-button
            class="ML_30"
            type="primary"
            icon="el-icon-search"
            @click="search"
            :loading="loading"
          >搜索</el-button>

          <!-- <el-checkbox v-model="checked" class="check ML_30">合作者限制为中国学者</el-checkbox> -->
        </div>
      </div>
      <div class="home-tip" v-if="showTip">
        <span>说明：</span>
        <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
        <p>同领域学者：与查询学者在同期刊上发文的学者</p>
        <p>展示时间受节点数量影响，二次跳转节点数量超过2000预计需耗时20秒，请您耐心等待</p>
      </div>
      <div class="home-body row" v-if="searchShow" v-loading="loading">
        <div class="home-body-relations" id="table1">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50 overflow" id="overflow1">
            <div class="row relation-echart" v-if="tableData1.length">
              <el-table
                @row-click="clickCell"
                :data="tableData1"
                border
                style="width: 100%"
                :span-method="arraySpanMethod"
                :row-class-name="tableRowClassName"
              >
                <el-table-column label="姓名" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span v-if="scope.row.isPath">{{scope.row.title}}</span>
                    <el-tooltip
                      v-else
                      class="item"
                      effect="dark"
                      :content="scope.row.linkinfo"
                      placement="top-start"
                    >
                      <span
                        style="cursor:pointer"
                        :id="scope.row.oData.Id"
                      >{{scope.row.oData.Name}}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="机构" align="center" show-overflow-tooltip>
                  <template slot-scope="scope" v-if="!scope.row.isPath">
                    <span style="cursor:pointer">{{scope.row.oData.Organization}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else class="none" v-loading="loading">无符合此条件学者</div>
          </div>
        </div>
        <div class="home-body-relations" v-loading="loading2">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50 overflow" id="overflow2">
            <div class="row relation-echart" v-if="tableData2.length">
              <el-table
                @row-click="clickCell"
                @cell-mouse-enter="hover"
                @cell-mouse-leave="leave"
                :data="tableData2"
                border
                style="width: 100%"
                :span-method="arraySpanMethod"
                :row-class-name="tableRowClassName"
              >
                <el-table-column label="姓名" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span v-if="scope.row.isPath">{{scope.row.title}}</span>
                    <el-tooltip
                      v-else
                      class="item"
                      effect="dark"
                      :content="scope.row.linkinfo"
                      placement="top-start"
                    >
                      <span
                        style="cursor:pointer"
                        :id="scope.row.oData.Id"
                      >{{scope.row.oData.Name}}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="机构" align="center" show-overflow-tooltip>
                  <template slot-scope="scope" v-if="!scope.row.isPath">
                    <span style="cursor:pointer">{{scope.row.oData.Organization}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else class="none" v-loading="loading">无符合此条件学者</div>
          </div>
        </div>
        <div class="home-body-relations" v-loading="loading3">
          <el-divider content-position="left">合作路径</el-divider>
          <div class="PL_50 PR_50 overflow">
            <div class="row relation-echart" v-if="tableData3.length">
              <el-table
                @row-click="clickCell"
                @cell-mouse-enter="hover2"
                @cell-mouse-leave="leave2"
                :data="tableData3"
                border
                style="width: 100%"
                :span-method="arraySpanMethod"
                :row-class-name="tableRowClassName"
              >
                <el-table-column label="姓名" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span v-if="scope.row.isPath">{{scope.row.title}}</span>
                    <el-tooltip
                      v-else
                      class="item"
                      effect="dark"
                      :content="scope.row.linkinfo"
                      placement="top-start"
                    >
                      <span style="cursor:pointer" :id="scope.row.oData.Id">{{scope.row.oData.Name}}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="机构" align="center" show-overflow-tooltip>
                  <template slot-scope="scope" v-if="!scope.row.isPath">
                    <span style="cursor:pointer">{{scope.row.oData.Organization}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else class="none" v-loading="loading">无符合此条件学者</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import tableTem from '@/components/common/tableTem'
import figureChart from '@/components/Charts/figureChart'
export default {
  name: 'line',
  components: {
    figureChart,
    tableTem
  },
  data () {
    return {
      loading: false,
      loading2: false,
      loading3: false,
      searchShow: false, // 是否第一次查询
      name: this.$route.query.name, // 姓名
      org: this.$route.query.Organization, // 机构
      plName: 'tao,yunzhe',
      plOrg: 'columbia univ',
      options: [
        { value: 'ai', label: '人工智能' },
        { value: 'library', label: '图书情报学' }
      ],
      type: 'ai',
      p1: '',
      id: '',
      ids: [],
      paparData: [],
      collData: [],
      fieldData: [],
      showTip: true,
      runInterval: false,
      runInterval2: false,
      interval: null,
      screenHeight: document.documentElement.clientHeight,
      interval2: null,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      line: [],
      lines1: [],
      lines2: []
    }
  },
  methods: {
    // 搜索
    search () {
      if (!this.name && !this.org) {
        this.name = this.plName
        this.org = this.plOrg
      }
      if (!this.name) {
        this.$message('请输入查询姓名')
        return
      }
      if (!this.org) {
        this.$message('请输入查询机构')
        return
      }
      this.clear()
      let data = this.getData({
        type: 3,
        s_name: this.name,
        s_org: this.org,
        db: this.type
      })
      if (!data.data.length) {
        this.$message('未能搜索到结果！')
        this.loading = false
        return
      }
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
    // 模糊查询姓名
    remoteMethodName (queryString, cb) {
      if (queryString.length < 2) {
        return
      }
      this.loading = true
      let that = this
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_namematch',
        data: {
          type: 1,
          db: this.type,
          name: queryString
        },
        dataType: 'json',
        async: false,
        success: function (res) {
          that.optionsName = res.data.map(it => {
            return {
              id: it.id,
              name: it.name,
              org: it.organization,
              value: it.name + ' (' + it.organization + ')'
            }
          })
          cb(that.optionsName)
          that.loading = false
        }
      })
    },
    // 模糊查询机构
    remoteMethodOrg (data, cb) {
      if (data.length < 3) {
        this.optionsName = []
        return
      }
      this.loading = true
      let that = this
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_namematch',
        data: {
          type: 2,
          db: this.type,
          name: this.name,
          org: data
        },
        dataType: 'json',
        async: false,
        success: function (res) {
          that.optionsOrg = res.data.map(it => {
            return {
              id: it.id,
              name: it.name,
              org: it.organization,
              value: it.organization
            }
          })
          cb(that.optionsOrg)
          that.loading = false
        }
      })
    },
    // 选择姓名
    changeName (query) {
      this.name = query.name
      this.org = query.org
    },
    // 选择机构
    changeOrg (query) {
      this.org = query.org
    },
    // 获取表格1的数据
    getTableData1 () {
      let papar = []
      let coll = []
      let field = []
      let paparTitle = []
      let collTitle = []
      let fieldTitle = []
      this.paparData[0] = this.getData({
        type: 15,
        ids: [{ id: this.id, link: this.name }],
        db: this.type,
        l: 1,
        p0: this.id
      })
      papar = papar.concat(
        this.sort(this.paparData[0].zjudata),
        this.sort(this.paparData[0].chinadata),
        this.sort(this.paparData[0].autodata)
      )
      if (papar.length) {
        this.accIds(papar)
        paparTitle = {
          title: '论文合作者',
          isPath: true,
          linkinfo: '论文合作者'
        }
      }
      this.collData[0] = this.getData({
        type: 6,
        p1: this.p1,
        notin: this.ids,
        db: this.type,
        p0: this.id
      })
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
          this.sort(zjudata),
          this.sort(chinadata),
          this.sort(autodata)
        )
        this.accIds(coll)
      }
      let fieldIds = this.ids
      fieldIds.push({ id: this.id })
      this.fieldData[0] = this.getData({
        type: 7,
        db: this.type,
        p1: this.p1,
        notin: fieldIds,
        p0: this.id
      })
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
          this.sort(zjudata),
          this.sort(chinadata),
          this.sort(autodata)
        )
        this.accIds(field)
      }

      this.tableData1 = this.tableData1.concat(
        paparTitle,
        papar,
        collTitle,
        coll,
        fieldTitle,
        field
      )
      this.loading = false
      if (this.tableData1.length) {
        this.loading2 = true
        this.loading3 = true
        setTimeout(() => {
          this.getTableData2()
        }, 500)
      }
    },
    // 获取表格1的数据
    getTableData2 () {
      let paparData = []
      let papar = []
      let coll = []
      let paparTitle = []
      let collTitle = []
      if (this.paparData[0].zjudata.length) {
        paparData = paparData.concat(
          this.paparData[0].chinadata,
          this.paparData[0].autodata
        )
      } else {
        paparData = paparData.concat(
          this.paparData[0].zjudata,
          this.paparData[0].chinadata,
          this.paparData[0].autodata
        )
      }
      if (paparData.length) {
        let paparIds = paparData.map(it => {
          return {
            id: it.oData.Id,
            link: it.linkinfo
          }
        })
        this.paparData[1] = this.getData({
          type: 15,
          notin: this.ids,
          ids: paparIds,
          db: this.type,
          l: 21,
          p0: this.id
        })
        papar = papar.concat(
          this.sort(this.paparData[1].zjudata),
          this.sort(this.paparData[1].chinadata),
          this.sort(this.paparData[1].autodata)
        )
        if (papar.length) {
          paparTitle = {
            title: '论文合作者的论文合作者',
            isPath: true,
            linkinfo: '论文合作者的论文合作者'
          }
        }
      }

      if (this.collData[0].data.length) {
        let collIds = []
        this.collData[0].data.forEach(element => {
          if (element.texttype !== 'zju') {
            collIds.push({
              id: element.oData.Id,
              link: this.name + '-----' + element.oData.Name
            })
          }
        })

        this.collData[1] = this.getData({
          type: 15,
          db: this.type,
          ids: collIds,
          notin: this.ids,
          l: 22,
          p0: this.id
        })
        coll = coll.concat(
          this.sort(this.collData[1].zjudata),
          this.sort(this.collData[1].chinadata),
          this.sort(this.collData[1].autodata)
        )
        if (coll.length) {
          collTitle = {
            title: '同事的论文合作者',
            isPath: true,
            linkinfo: '同事的论文合作者'
          }
        }
      }
      this.accIds(papar)
      this.accIds(coll)
      this.tableData2 = this.tableData2.concat(
        paparTitle,
        papar,
        collTitle,
        coll
      )
      this.loading2 = false
      if (this.tableData2.length) {
        this.accLines()
        this.getTableData3()
      } else {
        this.loading3 = false
      }
    },
    // 获取表格1的数据
    getTableData3 () {
      this.loading3 = true
      let paparData = []
      let collData = []
      let papar = []
      let coll = []
      let paparTitle = []
      let collTitle = []
      if (this.paparData[1]) {
        if (this.paparData[1].zjudata.length) {
          paparData = paparData.concat(
            this.paparData[1].chinadata,
            this.paparData[1].autodata
          )
        } else {
          paparData = paparData.concat(
            this.paparData[1].zjudata,
            this.paparData[1].chinadata,
            this.paparData[1].autodata
          )
        }
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
          l: 31,
          db: this.type,
          notin: this.ids,
          p0: this.id
        })
        papar = papar.concat(
          this.sort(this.paparData[2].zjudata),
          this.sort(this.paparData[2].chinadata),
          this.sort(this.paparData[2].autodata)
        )
        if (papar.length) {
          paparTitle = {
            title: '论文合作者的论文合作者的论文合作者',
            isPath: true,
            linkinfo: '论文合作者的论文合作者的论文合作者'
          }
        }
      }
      if (this.collData[1]) {
        if (this.collData[1].zjudata.length) {
          collData = collData.concat(
            this.collData[1].zjudata,
            this.collData[1].chinadata,
            this.collData[1].autodata
          )
        } else {
          collData = collData.concat(
            this.collData[1].zjudata,
            this.collData[1].chinadata,
            this.collData[1].autodata
          )
        }

        if (collData.length) {
          let collIds = collData.map(it => {
            return {
              id: it.oData.Id,
              link: it.linkinfo
            }
          })
          this.collData[2] = this.getData({
            type: 15,
            notin: this.ids,
            db: this.type,
            ids: collIds,
            l: 32,
            p0: this.id
          })
          coll = coll.concat(
            this.sort(this.collData[2].zjudata),
            this.sort(this.collData[2].chinadata),
            this.sort(this.collData[2].autodata)
          )
        }
        if (coll.length) {
          collTitle = {
            title: '同事的论文合作者的论文合作者',
            isPath: true,
            linkinfo: '同事的论文合作者的论文合作者'
          }
        }
      }
      this.tableData3 = this.tableData3.concat(
        paparTitle,
        papar,
        collTitle,
        coll
      )
      if (this.tableData3.length) {
        this.accLines2()
      }
      this.loading3 = false
    },
    accIds (data) {
      data.forEach(it => {
        this.ids.push({ id: it.oData.Id })
      })
    },
    // 组装线条1
    accLines (data) {
      let table1 = this.tableData1
      let table2 = this.tableData2
      let table1Ids = []
      table1.forEach((it, index) => {
        if (!it.isPath) {
          table1Ids.push({
            id: it.oData.Id,
            name: it.oData.Name,
            locat: index
          })
        }
      })

      table2.forEach((it, index) => {
        if (!it.isPath) {
          let temp = it.linkinfo.split('-----')
          let indexn = table1Ids.findIndex(item => item.name === temp[1])
          this.lines1.push({
            start: it.oData.Id,
            end: table1Ids[indexn].id,
            locat: table1Ids[indexn].locat
          })
        }
      })
    },
    // 组装线条2
    accLines2 (data) {
      let table1 = this.tableData2
      let table2 = this.tableData3

      let table1Ids = []
      table1.forEach((it, index) => {
        if (!it.isPath) {
          table1Ids.push({
            id: it.oData.Id,
            name: it.oData.Name,
            locat: index
          })
        }
      })
      table2.forEach((it, index) => {
        if (!it.isPath) {
          let temp = it.linkinfo.split('-----')
          let indexn = table1Ids.findIndex(item => item.name === temp[2])
          this.lines2.push({
            start: it.oData.Id,
            end: table1Ids[indexn].id,
            locat: table1Ids[indexn].locat
          })
        }
      })
    },
    // 搜索时清空数据
    clear () {
      this.searchShow = true
      this.loading = true
      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.ids = []
      this.lines1 = []
      this.lines2 = []
    },
    // 绘制表格
    drwaLine (row, indexn) {
      this.line[row.oData.Id] = new LeaderLine(
        document.getElementById(this.lines1[indexn].start),
        document.getElementById(this.lines1[indexn].end),
        {
          color: '#5bf',
          endPlug: 'disc',
          size: 2,
          duration: 500,
          timing: [0.58, 0, 0.42, 1],
          hide: true
        }
      ).hide('draw', { duration: 2000, timing: [0.42, 0.6, 0.4, 1] })
      this.line[row.oData.Id].show()
    },
    drwaLine2 (row, indexn) {
      this.line[row.oData.Id] = new LeaderLine(
        document.getElementById(this.lines2[indexn].start),
        document.getElementById(this.lines2[indexn].end),
        {
          color: '#5bf',
          endPlug: 'disc',
          size: 2,
          duration: 500,
          timing: [0.58, 0, 0.42, 1],
          hide: true
        }
      ).hide('draw', { duration: 2000, timing: [0.42, 0.6, 0.4, 1] })
      this.line[row.oData.Id].show()
      let temp = {
        oData: {
          Id: this.lines2[indexn].end
        }
      }
      this.hover(temp, 1)
    },
    // 表格classNmae
    tableRowClassName ({ row, rowIndex }) {
      if (row.texttype === 'zju') {
        return 'row-red'
      } else if (row.texttype === 'chinese') {
        return 'row-highlighted'
      } else if (row.linkcount > 5) {
        return 'row-purple'
      }
      if (row.isPath) {
        return 'row-path'
      }
      return ''
    },
    // 表格合并
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (row.isPath || row.more) {
        return {
          rowspan: 1,
          colspan: 2
        }
      }
    },
    // 表格点击
    clickCell (row, column, cell, event) {
      if (!column || row.isPath) {
        return
      }
      let routeData = this.$router.resolve({
        name: '/',
        query: { name: row.oData.Name, Organization: row.oData.Organization }
      })
      window.open(routeData.href, '_blank')
    },
    // 表格hover
    hover (row, column, cell, event) {
      if (!column || row.isPath) {
        return
      }
      let indexn = this.lines1.findIndex(item => item.start === row.oData.Id)
      let scroll = $('#overflow1').scrollTop()
      let min = scroll < 40 ? -1 : Math.round((scroll + 10) / 40) - 1
      let max = Math.floor($('#overflow1').height() / 40) - 1 + min
      if (min >= this.lines1[indexn].locat) {
        let offsetNum = (min - this.lines1[indexn].locat) * 40
        let i = 0
        this.runInterval = true
        this.interval = setInterval(() => {
          i = i + 15
          $('#overflow1').scrollTop(scroll - i)
          if (i >= offsetNum) {
            clearInterval(this.interval)
            this.runInterval = false
            this.drwaLine(row, indexn)
          }
        }, 10)
      } else if (max <= this.lines1[indexn].locat) {
        let offsetNum = (this.lines1[indexn].locat - max + 1) * 40
        let i = 0
        this.runInterval = true
        this.interval = setInterval(() => {
          i = i + 15
          $('#overflow1').scrollTop(scroll + i)
          if (i >= offsetNum) {
            clearInterval(this.interval)
            this.runInterval = false
            this.drwaLine(row, indexn)
          }
        }, 10)
      } else {
        this.drwaLine(row, indexn)
      }
    },
    // 表格leave
    leave (row, column, cell, event) {
      if (this.runInterval) {
        this.runInterval = false
        clearInterval(this.interval)
        return
      }
      if (!column || row.isPath) {
        return
      }
      this.line[row.oData.Id].remove()
    },
    // 表格2hover
    hover2 (row, column, cell, event) {
      if (!column || row.isPath) {
        return
      }
      let indexn = this.lines2.findIndex(item => item.start === row.oData.Id)
      let scroll = $('#overflow2').scrollTop()
      let min = scroll < 40 ? -1 : Math.round((scroll + 10) / 40) - 1
      let max = Math.floor($('#overflow2').height() / 40) - 1 + min
      console.log(scroll, min, max, this.lines2[indexn].locat)

      if (min >= this.lines2[indexn].locat) {
        let offsetNum = (min - this.lines2[indexn].locat) * 40
        let i = 0
        this.runInterval2 = true
        this.interval2 = setInterval(() => {
          if (offsetNum > 500) {
            i = i + 45
          } else {
            i = i + 15
          }
          $('#overflow2').scrollTop(scroll - i)
          if (i >= offsetNum) {
            clearInterval(this.interval2)
            this.runInterval2 = false
            this.drwaLine2(row, indexn)
          }
        }, 10)
      } else if (max <= this.lines2[indexn].locat) {
        let offsetNum = (this.lines2[indexn].locat - max + 1) * 40
        let i = 0
        this.runInterval2 = true
        this.interval2 = setInterval(() => {
          if (offsetNum > 500) {
            i = i + 45
          } else {
            i = i + 15
          }
          $('#overflow2').scrollTop(scroll + i)
          if (i >= offsetNum) {
            clearInterval(this.interval2)
            this.runInterval2 = false
            this.drwaLine2(row, indexn)
          }
        }, 10)
      } else {
        this.drwaLine2(row, indexn)
      }
    },
    // 表格leave
    leave2 (row, column, cell, event) {
      if (!column || row.isPath) {
        return
      }
      if (this.runInterval2) {
        this.runInterval2 = false
        this.runInterval = false
        clearInterval(this.interval2)
        clearInterval(this.interval)
        return
      }
      if (this.runInterval) {
        clearInterval(this.interval)
        this.runInterval = false
        this.line[row.oData.Id].remove()
        return
      }
      let indexn = this.lines2.findIndex(item => item.start === row.oData.Id)
      this.line[row.oData.Id].remove()
      this.line[this.lines2[indexn].end].remove()
    },
    // 排序
    sort (ary) {
      return ary.sort(function (a, b) {
        let x = a.linkcount
        let y = b.linkcount
        return x > y ? -1 : x < y ? 1 : 0
      })
    },
    // 根据页面宽度设置表格高度
    changeExpHeight (val) {
      if (val < 800) {
        this.showTip = false
      } else {
        this.showTip = true
      }
    },
    handleClick () {}
  },
  mounted () {
    if (this.$route.query.name) {
      this.search()
    }
    let that = this
    that.changeExpHeight(this.screenHeight)
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      that.screenHeight = document.documentElement.clientHeight // 窗口高度
    }
  },
  watch: {
    screenHeight: {
      deep: true,
      handler (val) {
        this.changeExpHeight(val)
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  min-width: 1200px;
  width: 94vw;
  margin: 4vh 0;
  .home-header {
    width: 100%;
    height: 10vh;
    max-height: 100px;
    min-height: 82px;
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
  .home-tip {
    margin-top: 2vh;
    height: 14vh;
    min-height: 130px;
  }
  .home-body {
    margin-top: 4vh;
    .home-body-relations {
      width: 33%;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      .overflow {
        overflow: auto;
        height: 55vh;
      }
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
        .row-purple {
          color: #cd00cd;
        }
        .el-button {
          width: 90%;
        }
        .el-table td,
        .el-table th {
          padding: 8px 0 !important;
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
