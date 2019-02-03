import Vue from 'vue'
import Router from 'vue-router'
import Printers from './views/Printers.vue'
import Printer from './views/Printer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Printers',
      component: Printers
    },
    {
      path: '/printer',
      name: 'Printer',
      props: ({ query }) => ({ uri: query.uri }),
      component: Printer
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
  stringifyQuery(query) {
    const escape = c => `%${c.charCodeAt(0).toString(16)}`

    // Avoid cleanPath from vue-router https://github.com/vuejs/vue-router/blob/next/src/util/path.js#L73
    const unclean = str => str.replace(/\/\//g, '///')

    const res = Object.entries(query)
      .filter(([key, value]) => key && value)
      .map(([key, value]) => `${key.replace(/=/g, escape)}=${unclean(value).replace(/[&%]/g, escape)}`)
    return res.length ? `?${res.join('&')}` : '' 
  },
  parseQuery(query) {
    return query.split('&')
                .map(q => q.split('=').map(decodeURIComponent))
                .reduce((c, [key, value]) => (c[key] = value, c), {})
  }
})
