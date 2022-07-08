import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { getData } from './service'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'reset-css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueVirtualScroller)

;(async () => {
  try {
    const feeds = await getData()
    store.commit({ type: 'podcastData', podcastData: feeds })
  } catch (err) {
    window.alert('cannot get feeds')
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
