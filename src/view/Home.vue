<template>
  <div class="layer">
    <div class="home">
      <div class="home-header MT_50">
        <el-divider content-position="left">学者合作路径查询</el-divider>
        <div class="home-header-search PR_20 PL_20">
          <span>查询人名</span>
          <el-input class="ML_30" v-model="name" placeholder="必填"></el-input>
          <span class="ML_30">查询机构</span>
          <el-input class="ML_30" v-model="org" placeholder="必填"></el-input>
          <el-button class="ML_30" type="primary" icon="el-icon-search" @click="search" :loading="loading">搜索</el-button>
          <el-checkbox v-model="checked" class="check ML_30">合作者限制为中国学者</el-checkbox>
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
      <el-tabs v-model="activeName" @tab-click="handleClick" v-if="searchShow">
        <el-tab-pane label="论文合作学者" name="first">
          <keep-alive>
            <paper :name="name" :org="org" :showPath="showPath" :activeName='activeName' :checked='checked'></paper>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="同事" name="second">
           <keep-alive>
          <coll :name="name" :org="org" :showPath="showPath" :activeName='activeName' :checked='checked'></coll>
           </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="同领域中国学者" name="third">
           <keep-alive>
          <field :name="name" :org="org" :showPath="showPath" :activeName='activeName' :checked='checked'></field>
           </keep-alive>
        </el-tab-pane>
      </el-tabs>

      <!-- <i class="el-icon-bottom" v-if="searchShow"></i> -->
    </div>
  </div>
</template>

<script>
import paper from './tables/paper'
import coll from './tables/coll'
import field from './tables/field'
import figureChart from '@/components/Charts/figureChart'
export default {
  name: 'home',
  components: {
    figureChart,
    coll,
    field,
    paper
  },
  data () {
    return {
      activeName: '',
      loading: false,
      searchShow: false, // 是否第一次查询
      name: 'tao,yunzhe', // 姓名
      org: 'columbia univ', // 机构
      showPath: '', // 路径
      checked: false, // 模糊匹配
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
      this.searchShow = false
      this.showPath = this.name + '(' + this.org + ')'
      this.activeName = 'first'
      setTimeout(() => {
        this.loading = false
        this.searchShow = true
      }, 1000)
    },
    handleClick () {

    }
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

      .check span{
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
