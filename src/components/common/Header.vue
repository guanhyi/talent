<template>
  <div>
    <el-row class="header" type="flex" justify="center">
      <el-col :span="6" >
        <img class="logo" src="static/img/common/logo2020-.png" />
      </el-col>
      <el-col :offset='12' :span="4">
        <span @click="goHome">首页</span>
        <span @click="goTalent">人才发现</span>
        <span>使用说明</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  methods: {
    goTalent () {
      this.$router.push({
        path: '/talent'
      })
    },
    goHome () {
      this.$router.push({
        path: '/'
      })
    }
  }

}
</script>

<style scoped>
</style>
