import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Parser from 'rss-parser'
import ElementUI from 'element-ui'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'reset-css'

Vue.config.productionTip = false

const parser = new Parser()
Vue.use(ElementUI)
Vue.use(VueVirtualScroller)

async function getData () {
  const url = '/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml'
  const feeds = await parser.parseURL(url)
  console.log(feeds)
  store.commit({ type: 'podcastData', podcastData: feeds })

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

getData()
