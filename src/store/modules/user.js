import apis from '@/api'
import {
  getToken,
  setToken,
  saveToLocal,
  loadFromLocal,
  removeFromLocal,
  removeToken
} from '@/utils/auth'
import {
  UserInfoKey,
  MenusKey
} from '@/config'
import * as type from '../mutationType'
const user = {
  state: {
    // userId: getUserId(),
    token: getToken(),
    menus: loadFromLocal(MenusKey) || [],
    userInfo:
    loadFromLocal(UserInfoKey) ||
    {
      id: null,
      isDel: null,
      loginTime: null,
      realName: 'miyoyi',
      roleId: null,
      status: null,
      tokenId: null,
      type: null,
      userName: null,
      bankName: null,
      bankUser: null,
      bankAccount: null
    }
  },

  mutations: {
    [type.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [type.SET_NAME]: (state, name) => {
      state.name = name
    },
    [type.SET_AVATAR]: (state, headImg) => {
      state.headImg = headImg
    },
    [type.SET_ROLES]: (state, roles) => {
      state.roles = roles
    },
    [type.SET_MENUS]: (state, menus) => {
      state.menus = menus
    },
    [type.SET_USER_INFO]: (state, data) => {
      console.log('setUserIINfo')
      state.userInfo = data
    },
    [type.SET_USER_TYPE]: (state, type) => {
      state.userType = +type
    },
    [type.SET_USER_ID]: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login ({ commit, dispatch }, userInfo) {
      const userName = userInfo.userName.trim()
      return new Promise(async (resolve, reject) => {
        try {
          const data = await apis.public.login({
            userName,
            passWord: userInfo.password,
            timestamp: userInfo.timestamp
          })
          //  .then(response => {
          //     const data = response
          setToken(data.tokenId)
          commit(type.SET_USER_INFO, data)
          saveToLocal(UserInfoKey, data)
          commit(type.SET_TOKEN, data.tokenId)
          dispatch('GetInfo')
          // try {
          //   await dispatch('GetMenu', data.id)
          resolve()
          // } catch (error) {
          //   reject(error)
          // }
        } catch (error) {
          reject(error)
        }
        // })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return apis.public.getUserInfo({ id: state.id }).then(response => {
        // state.userId
        const data = response
        saveToLocal(UserInfoKey, data || {})
        commit(type.SET_USER_INFO, data)
        return response
      })
    },

    // 获取菜单
    GetMenu ({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = {}
          saveToLocal(MenusKey, response)
          commit(type.SET_MENUS, response)
          if (response.length <= 0) {
            // eslint-disable-next-line
            return Promise.reject("没有相关菜单权限");
          }
          resolve(response)
        } catch (error) {
          removeToken()
          reject(error)
        }
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      // debugger
      return apis.systemAccount.logout(state.token).then(() => {
        commit(type.SET_TOKEN, '')
        commit(type.SET_ROLES, [])
        commit(type.SET_MENUS, [])
        removeFromLocal(UserInfoKey)
        removeFromLocal(MenusKey)
        removeToken()
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit(type.SET_TOKEN, '')
        commit(type.SET_ROLES, [])
        commit(type.SET_MENUS, [])
        removeFromLocal(UserInfoKey)
        removeFromLocal(MenusKey)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
