import config from '@/config'
import * as type from '../mutationType'
const { showSettings, fixedHeader, sidebarLogo } = config

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  [type.CHANGE_SETTING] (state, { key, value }) {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit(type.CHANGE_SETTING, data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
