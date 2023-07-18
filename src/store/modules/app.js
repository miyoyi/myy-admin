import Cookies from 'js-cookie'
import * as type from '../mutationType'
export default {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    loading: false
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit(type.TOGGLE_SIDEBAR)
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit(type.CLOSE_SIDEBAR, withoutAnimation)
    },
    toggleDevice ({ commit }, device) {
      commit(type.TOGGLE_DEVICE, device)
    },
    loading: ({
      commit
    }, loading = true) => {
      commit(type.GLOBAL_LOADING, loading)
    }
  },
  mutations: {
    [type.TOGGLE_SIDEBAR] (state) {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    [type.GLOBAL_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    },
    [type.CLOSE_SIDEBAR] (state, withoutAnimation) {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    [type.TOGGLE_DEVICE] (state, device) {
      state.device = device
    }
  }
}
