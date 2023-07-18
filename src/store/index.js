import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { requireFolderObj } from '@/utils'
if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex)
}
const vuexData = requireFolderObj(require.context('./modules', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js'])
const store = new Vuex.Store({
  modules: {
    ...vuexData
  },
  getters
})

export default store
