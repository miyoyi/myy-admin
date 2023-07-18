import { requireRoutesArray, requireMenusArray } from '@/utils'
import { getContent, localRoutes } from '../filterRoutes'
import store from '@/store'

const content = requireRoutesArray(require.context('./', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js'])
const routeMenus = requireMenusArray(require.context('./', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js'])

// 菜单做排序处理
const addRouter = getContent(localRoutes, store.getters.menus)
export const menus = addRouter.sort((a, b) => a.sort - b.sort)

export default content
