// import store from '@/store'
import { getChildMenus, cloneObj } from '@/utils'
import { saveToLocal } from '@/utils/auth'
import { FilterMenuKey, SidebarMenuKey, env } from '@/config'
// import * as yy from '@/router'
import Layout from '@/layout'

const commonTest = env === 'development' ? [{
  path: '/commonTest',
  component: () => import('@/views/commonsTest/index'),
  hidden: true
}] : []
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  ...commonTest
]
// 获取本地路由数组
const getLocalRoutes = (r, exinclude) => {
  let contents = []
  const paths = r.keys().filter(p => {
    return exinclude.indexOf(p) === -1
  })
  for (const p of paths) {
    const fn = r(p).default ? r(p).default : r(p)
    contents = contents.concat(fn)
  }
  return contents
}
export const localRoutes = getLocalRoutes(
  require.context('./routes', true, /^\.\/[\s\S]+\/*\.js$/),
  ['./index.js']
)
// 获取异步数据路由

// const asyncRoutes = store.getters.menus

// 获取筛选后的菜单路由
export const getRealRoutes = (localRoutes, asyncRoutes) => {
  const routes = []
  const filterLocalRoutes = cloneObj(localRoutes)
  asyncRoutes &&
    asyncRoutes.length &&
    asyncRoutes.forEach(a => {
      // 筛选的本地路由
      let real =
        filterLocalRoutes &&
        filterLocalRoutes.length &&
        filterLocalRoutes.find(l => l.name === a.menuUrl)
      // 如果接口无子集，本地有子集的，不添加该项，否则正常筛选其子集
      if (real && real.children && real.children.length) {
        if (a.children && a.children.length) {
          real.children = getRealRoutes(real.children, a.children)
        } else {
          real = undefined
        }
      }
      if (real) {
        real.meta.iconUrl = a.iconUrl
        routes.push({ ...real, meta: { ...real.meta, title: a.menuName } })
      }
    })
  return routes
}

// const realRoutes = getRealRoutes(localRoutes, asyncRoutes)

// 获取拍扁后的路由
export const getContent = (localRoutes, asyncRoutes) => {
  const realMenu = getRealRoutes(localRoutes, asyncRoutes)
  saveToLocal(SidebarMenuKey, realMenu)
  const realRouter = getChildMenus(realMenu)
  const redirect =
    (realRouter && realRouter.length && realRouter[0].path) || '/login'
  const addRouter = [
    ...constantRoutes,
    {
      path: '/',
      component: Layout,
      redirect: redirect,
      children: [...realRouter]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
  saveToLocal(FilterMenuKey, addRouter)
  return addRouter
}
