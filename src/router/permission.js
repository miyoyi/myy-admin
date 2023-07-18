import router from '@/router'
import store from '@/store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  removeToken,
  loadFromLocal,
  removeFromLocal
} from '@/utils/auth' // get token from cookie
import {
  UserInfoKey,
  FilterMenuKey,
  SidebarMenuKey
} from '@/config'
import { localRoutes, getContent } from './filterRoutes'
import getPageTitle from '@/utils/get-page-title'
import { toPath } from 'lodash'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
let isAddRoutes = false
let isGetMenu = false
router.beforeEach(async (to, from, next) => {
  // start progress bar
  // await store.dispatch('setTypeList')
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // 如果去了登录页就删掉缓存
  if (to.path.indexOf('/login') !== -1) {
    isGetMenu = false
    isAddRoutes = false
    removeToken()
    removeFromLocal(FilterMenuKey)
    removeFromLocal(SidebarMenuKey)
  }
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken && hasToken !== 'undefined') {
    if (!isGetMenu) {
      await store.dispatch('GetMenu')
      isGetMenu = true
    }
    const addRouter = getContent(localRoutes, store.getters.menus)
    // console.log('addRouter', addRouter)
    if (!isAddRoutes) {
      router.addRoutes(addRouter)
      isAddRoutes = true
      let toPath = to.path
      if (to.path === ('/')) {
        // const layoutRoute = addRouter.find(item => item.path === '/')
        // toPath = layoutRoute.children[0].path
        toPath = '/'
      }
      next({ path: toPath })
    } else {
      next()
      NProgress.done()
    }
    // next()
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
