// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import config from '@/config'
import ElementUI from 'element-ui'
import filters from '@/filters'
import { eachOwn } from '@/utils'
import message from '@/utils/message'
import '@/styles/index.scss' // global css
import '@/mixins/globalMixin'
import App from './App'
import router from './router'
import ZmCommons from '@/commons/index'
import store from './store'
import '@/icons' // icon
import '@/router/permission'
import * as auth from '@/utils/auth'
import * as utils from '@/utils/index'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.config.devtools = true
Vue.prototype.$auth = auth
Vue.prototype.$utils = utils
Vue.prototype.$msg = message
eachOwn(filters, (item, key) => {
  Vue.filter(key, item)
})
if (config.env === 'development') {
  Vue.use(ElementUI)
}
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 8888
  }
})
Vue.use(ZmCommons)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
