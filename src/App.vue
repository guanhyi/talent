<template>
  <div id="app">
    <Header > </Header>
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/common/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      path: ''
    }
  },
  mounted () {
    this.path = this.$route.path
  },
  watch: {
    $route (to, from) {
      this.path = to.path
    }
  }
}
</script>
