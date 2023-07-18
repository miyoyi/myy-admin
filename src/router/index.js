import Vue from 'vue'
import Router from 'vue-router'
// import routes from './routes'
import {constantRoutes} from './filterRoutes'
/* Layout */
import Layout from '@/layout'
if (process.env.NODE_ENV === 'development') {
  Vue.use(Router)
}

const createRouter = constantRoutes =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
const router = createRouter([...constantRoutes, {
  path: '/',
  component: Layout,
  children: [],
  meta: {}
}])

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter (constantRoutes) {
  const newRouter = createRouter(constantRoutes)
  router.matcher = newRouter.matcher // reset router
}

export default router
