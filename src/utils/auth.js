import Cookies from 'js-cookie'
import Storage from '@/utils/Storage'
import { TokenKey, UserIdKey, UserInfoKey } from '@/config'
import { getBaseData } from '@/utils/store'
export function getToken (token = TokenKey) {
  return Cookies.get(token)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getUserId () {
  return Cookies.get(UserIdKey)
}

export function setUserId (token) {
  return Cookies.set(UserIdKey, token)
}

export function removeUserId () {
  return Cookies.remove(UserIdKey)
}
export function setUserInfo (info) {
  return Cookies.set(UserInfoKey, JSON.stringify(info), { expires: 1 })
}
export function getUserInfo () {
  return Cookies.get(UserInfoKey)
}
export function removeUserInfo () {
  return Cookies.remove(UserInfoKey)
}

export function saveToLocal (name, value) {
  window.localStorage.setItem(name, JSON.stringify(value))
}

export function loadFromLocal (name) {
  let localStorageName = window.localStorage.getItem(name)
  // console.log(name, localStorageName, JSON.parse(localStorageName))
  try {
    if (localStorageName) {
      return JSON.parse(localStorageName)
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}

export function removeFromLocal (name) {
  window.localStorage.removeItem(name)
}
// 获取数据字段里面的包含 types 的项
// types String
// option Boolean | Objeac | Array
// Boolean 值时 直接插入 { name: '全部', value: '0' }
// Objeac | Array 直接合并
export function getBaseDataByType (type, option) {
  let list = getBaseData()
  let target = list[type] || []
  if (typeof option === 'boolean' && option) {
    target.unshift({ name: '全部', value: '-1' })
  } else if (typeof option === 'object') {
    target = [].concat(option).concat(target)
  }
  return target
}

// 获取数据字段里面的值（已放到全局filter）
export function getBaseDateValue (v, type, key = 'name') {
  let list = getBaseDataByType(type) || []
  let item = list.find(i => i.value + '' === v + '') || {}
  return item[key] || '-'
}

// 操作localStorage
export const loc = new Storage({ locKey: 'localStorage' })

// 操作 sessionStorage
export const sLoc = new Storage()
