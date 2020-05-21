<template>
  <div id="app">
    <Header></Header>
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
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = '/static/js/leader-line.min.js'
    document.body.appendChild(s)
    this.path = this.$route.path
  },
  watch: {
    $route (to, from) {
      this.path = to.path
    }
  }
}
</script>
