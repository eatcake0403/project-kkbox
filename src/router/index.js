import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Episode from '@/views/Episode.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Episode/:index',
    name: 'Episode',
    component: Episode,
    props: (route) => ({
      index: Number(route.params.index)
    }),
    beforeEnter: (to, from, next) => {
      if (store.state.podcastData.items[to.params.index]) {
        next()
      } else {
        next({ name: 'PageNotFound' })
      }
    }
  },
  {
    path: 'PageNotFound',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '*',
    redirect: { name: 'PageNotFound' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
