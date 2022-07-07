import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null
  },
  mutations: {
    data (store, payload) {
      store.data = payload.data
    }
  },
  actions: {
  },
  modules: {
  }
})
