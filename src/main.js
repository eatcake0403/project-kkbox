import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Parser from 'rss-parser'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'reset-css'

Vue.config.productionTip = false

const parser = new Parser()
Vue.use(ElementUI)

async function getData () {
  const url = '/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml'
  const feed = await parser.parseURL(url)
  console.log(feed)
  store.commit({ type: 'data', data: feed })

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

getData()
