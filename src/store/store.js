import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  bAuth: false
}

const mutations = {
  loginStatue (state, loginstatus) {
    state.bAuth = loginstatus
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store
