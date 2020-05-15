<template>
  <div class="hello" v-loading='loading'>
    <span>说明：</span>
    <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
    <p>同领域学者：与查询学者在同期刊上发文的学者</p>
    <div class="home-body row MT_50">
      <tableTem
        :tableData="tableData1"
        :serach="isSeach"
        @query="query"
        lable="的同事"
        class="tableTem"
        :showPath="showPath"
      ></tableTem>
      <tableTem  :tip='isTip' :tableData="tableData2" class="tableTem" lable="的同事的论文合作者"  :showPath="showPath"></tableTem>
      <tableTem
        :more='isMore'
        :tableData="tableData3"
        class="tableTem"
        lable="的同事的论文合作者的合作者"
        :showPath="showPath"
        @moreData="moreData"
      ></tableTem>
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
import tableTem from '@/components/common/tableTem'
import $ from 'jquery'
export default {
  name: 'coll',
  data () {
    return {
      isSeach: true,
      isMore: false,
      dialogVisible: false,
      loading: false,
      isTip: false,
      isLoad: false,
      num: 0,
      p1: '',
      list: [],
      lastList: [],
      times: '',
      moreIndex: 0,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      locData: []
    }
  },
  props: {
    checked: {
      type: Boolean
    },
    name: {
      type: String,
      required: true
    },
    org: {
      type: String,
      required: true
    },
    showPath: {
      type: String
    },
    activeName: {
      type: String,
      required: true
    }
  },
  components: {
    tableTem
  },
  methods: {
    // 搜索
    search () {
      this.loading = true
      let data = this.assemblyData(this.name, this.org)
      this.p1 = this.getPid(data)
      let temp = {
        type: '6',
        p1: this.p1,
        p0: this.p1
      }
      this.getData(temp)
    },
    // 获取数据
    getData (data) {
      let that = this
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_db',
        data: data,
        dataType: 'json',
        success: function (res) {
          that.tableData1 = res.data.map(item => {
            return {
              texttype: item.texttype,
              Email: item.oData.Email,
              name: item.oData.Name,
              org: item.oData.Organization,
              path: that.name + '-----' + item.oData.Name
            }
          })
          that.tableData2 = res.coauthorsdata.map(item => {
            return {
              texttype: item.texttype,
              Email: item.oData.Email,
              name: item.oData.Name,
              org: item.oData.Organization,
              path: that.name + '-----' + item.oData.Name
            }
          })
          that.tableData2.forEach((item, index) => {
            if (item.texttype !== 'zju') {
              that.list.push({
                path: item.path,
                name: item.name,
                org: item.org
              })
            }
          })
          console.log(that.list)

          if (that.list.length) {
            that.secondSearch(that.list[0], 0, 0, 0)
          } else {
            that.loading = false
          }
        }
      })
    },

    secondSearch (data, time, startTime) {
      this.isLoad = true
      let list = []
      let that = this
      let result = this.assemblyData(data.name, data.org)
      let p1 = this.getPid(result)
      $.ajax({
        type: 'post',
        url: 'http://183.136.237.195/graph_db',
        data: {
          cn: that.checked ? 1 : -1,
          type: '5',
          p1: p1,
          p0: this.p1
        },
        start_time: new Date().getTime(),

        dataType: 'json',
        success: function (res) {
          if (!this.num) {
            that.loading = false
          }
          if (!res.data.length) {
            that.num++
            if (that.num === that.list.length) {
              return
            }
            that.secondSearch(that.list[that.num], time - (new Date().getTime() - startTime), new Date().getTime())
            return
          }
          let path = {
            name: '',
            org: '',
            Email: '',
            path: data.path,
            isPath: true,
            texttype: ''
          }
          let temp = res.data.map(it => {
            return {
              name: it.oData.Name,
              org: it.oData.Organization,
              Email: it.oData.Email,
              path: data.path + '-----' + it.oData.Name,
              texttype: it.texttype,
              isPath: false
            }
          })
          list = list.concat(path)
          list = list.concat(temp)
          that.locData = that.locData.concat(temp)
          time = time - (new Date().getTime() - startTime)
          setTimeout(() => {
            that.mergeData(list)
          }, time)
        }
      })
    },
    mergeData (list) {
      this.num++
      let i = 0
      this.isLoad = false
      this.times = setInterval(() => {
        this.tableData3.push(list[i])
        i++
        if (i + 5 > list.length && !this.isLoad && this.list.length !== this.num) {
          this.secondSearch(this.list[this.num], list.length > 5 ? 2500 : list.length * 500, new Date().getTime())
        }
        if (i === list.length) {
          if (!this.moreIndex && this.list.length === this.num) {
            this.isMore = true
            this.moreIndex++
          }
          clearInterval(this.times)
        }
      }, 500)
    },
    moreData () {
      this.isMore = false
      this.loading = true
      this.list = []
      this.num = 0
      this.locData.forEach((item, index) => {
        if (item.texttype !== 'zju') {
          this.list.push({
            path: item.path,
            name: item.name,
            org: item.org
          })
        }
      })
      this.secondSearch(this.list[0], 0, 0)
    },
    // 查询
    query (data) {
      this.loading = true
      let that = this
      let ass = this.assemblyData(data.name, data.org)
      let p1 = this.getPid(ass)
      let temp = {
        type: '5',
        p1: p1,
        cn: that.checked ? 1 : -1
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

    //
    handleClose () {
      this.dialogVisible = false
    },
    setList () {
      this.list = []
      this.locData.forEach((item, index) => {
        if (item.texttype !== 'zju') {
          this.list.push({
            path: item.path,
            name: item.name,
            org: item.org
          })
        }
      })
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
    }
  },
  mounted () {
    // this.search()
  },
  watch: {
    activeName: {
      deep: true,
      handler (val) {
        if (val === 'second') {
          if (!this.tableData1.length) {
            this.search()
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
