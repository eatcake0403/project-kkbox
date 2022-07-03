import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Parser from 'rss-parser'

Vue.config.productionTip = false

const parser = new Parser()

async function getData () {
  const url = '/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml'
  const feed = await parser.parseURL(url)
  console.log(feed)
}

getData()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
