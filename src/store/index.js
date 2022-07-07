import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    podcastData: null
  },
  mutations: {
    podcastData (store, { podcastData }) {
      store.podcastData = podcastData
    }
  },
  actions: {
  },
  modules: {
  }
})
