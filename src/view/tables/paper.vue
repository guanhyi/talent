<template>
  <div class="hello" v-loading='loading'>
    <span>说明：</span>
    <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
    <p>同领域学者：与查询学者在同期刊上发文的学者</p>
    <div class="home-body row MT_50" >
      <tableTem
        :tableData="tableData1"
        class="tableTem"
        :showPath="showPath"
        lable="论文合作学者"
      ></tableTem>
      <tableTem
        :tableData="tableData2"
        class="tableTem"
        lable="论文合作者的合作者"
        :showPath="showPath"
      ></tableTem>
      <tableTem
        v-if="tableData3.length"
        :tableData="tableData3"
        class="tableTem"
        lable="论文合作者的合作者"
        :showPath="showPath"
        @moreData="moreData"
        :more="isMore"
      ></tableTem>
    </div>
  </div>
</template>

<script>
import tableTem from '@/components/common/tableTem'
import $ from 'jquery'
export default {
  name: 'paper',
  data () {
    return {
      isMore: false,
      times: '',
      moreIndex: 0,
      loading: false,
      isLoad: false,
      num: 0,
      p1: '',
      list: [],
      lastList: [],
      locData: [],
      tableData1: [],
      tableData2: [],
      tableData3: []
    }
  },
  props: {
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
    checked: {
      type: Boolean
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
      this.locData = []
      this.loading = true
      let data = this.assemblyData(this.name, this.org)
      this.p1 = this.getPid(data)
      let temp = {
        cn: -1,
        type: '5',
        p1: this.p1,
        l: 1
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
          that.tableData1.forEach((item, index) => {
            if (item.texttype !== 'zju') {
              that.list.push({
                path: item.path,
                name: item.name,
                org: item.org
              })
            }
          })
          if (that.list.length) {
            that.secondSearch(that.list[0], 0, 0, 0)
          } else {
            that.loading = false
          }
        }
      })
    },
    secondSearch (data, time, startTime, type) {
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
          if (!res.data.length) {
            that.num++
            if (that.num === that.list.length) {
              that.setList()
              that.moreData()
            }
            that.secondSearch(that.list[that.num], time - (new Date().getTime() - startTime), new Date().getTime(), type)
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
            if (type) {
              that.mergeData2(list)
            } else {
              that.mergeData(list)
            }
          }, time)
        }
      })
    },
    mergeData (list) {
      this.num++
      let i = 0
      this.isLoad = false
      this.loading = false
      this.times = setInterval(() => {
        this.tableData2.push(list[i])
        i++
        if (i + 5 > list.length && !this.isLoad && this.list.length !== this.num) {
          this.secondSearch(this.list[this.num], list.length > 5 ? 2500 : list.length * 500, new Date().getTime(), 0)
        }
        if (i === list.length) {
          if (this.list.length === this.num) {
            this.setList()
            this.moreData()
          }
          clearInterval(this.times)
        }
      }, 500)
    },
    mergeData2 (list) {
      this.num++
      let i = 0
      this.isLoad = false
      this.loading = false
      this.times = setInterval(() => {
        this.tableData3.push(list[i])
        i++
        if (i + 5 > list.length && !this.isLoad && this.list.length !== this.num) {
          this.secondSearch(this.list[this.num], list.length > 5 ? 2500 : list.length * 500, new Date().getTime(), 1)
        }
        if (i === list.length) {
          if (!this.moreIndex && this.list.length === this.num) {
            this.setList()
            this.isMore = true
            this.moreIndex++
          }
          clearInterval(this.times)
        }
      }, 500)
    },
    moreData () {
      this.isMore = false
      this.num = 0
      this.loading = true
      this.locData = []
      this.secondSearch(this.list[0], 0, 0, 1)
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
    this.search()
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
