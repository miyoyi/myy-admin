const { constant } = require('lodash')

const getSocketUrl = () => {
  let _res = 'ws://47.105.116.91:9501'
  if (process.env.NODE_ENV === 'production') {
    if (process.env.VUE_APP_FLAG === 'test') {
      _res = 'ws://47.105.116.91:9501'
    } else {
      _res = 'ws://120.27.69.182:9501'
    }
  }
  return _res
}
export const TokenKey = 'heart-Admin-Token'
export const UserIdKey = 'heart-Admin-User-Id'
export const MenusKey = 'heart-Admin-User-menus'
export const UserInfoKey = 'heart-Admin-User-Info'
export const FilterMenuKey = 'heart-Admin-filter-menus'
export const SidebarMenuKey = 'heart-Admin-sidebar-menus'
export const env = process.env.NODE_ENV
export const envFlage = process.env.VUE_APP_FLAG
export default {
  title: 'myy-admin',
  subTitle: 'Customer RelationShip Management',
  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  BASE_URL: process.env.VUE_APP_BASE_API || '/api', // dev:/systemApi test:/xShopAPi
  env: process.env.NODE_ENV,
  nodeEnv: process.env.NODE_ENV,
  mode: envFlage,
  webSocketUrl: getSocketUrl()
}
