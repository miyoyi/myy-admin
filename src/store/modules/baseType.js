import * as modelData from '@/model/index'
import {getDictList} from '@/api/src/dict'
import { getToken } from '@/utils/auth'
import Storage from '@/utils/Storage'
let sloc = new Storage()
let modelList = []
let hasTypeList = false

const state = {
  typeList: [ ]

}

const mutations = {
  SET_TYPE_LIST (state, info) {
    state.typeList = info
    sloc.set('baseTypeMap', info)
  }
}

const actions = {
  setTypeList ({ commit }, info) {
    if ((hasTypeList || !getToken()) && !info) { return Promise.resolve() }
    return getDictList().then(res => {
      let len = res.length
      const typeObj = {}
      for (; len--;) {
        const item = res[len]
        const type = item.type
        const typeItem = typeObj[type]
        if (!typeItem) {
          typeObj[type] = []
        }
        // typeObj[type].push(item)
        typeObj[type].unshift(item)
      }
      commit('SET_TYPE_LIST', typeObj)
      hasTypeList = true
    }).catch(() => {
      hasTypeList = false
    })
  }
}

const getters = {
  typeList: (state) => {
    const list = { ...modelData, ...state.typeList }
    return list
  }
}

export default {
  state,
  mutations,
  actions,
  getters

}
