import axios from 'axios'
import store from '../store'
import appConfig from '../config'
import { remove } from 'lodash'
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth'
import sign from '@/utils/sign'
import dayjs from 'dayjs'

// import qs from 'qs'
const _env = process.env.NODE_ENV
const MINI_TIME = 500
const _requests = []
function log (msg) {
  if (_env === 'development') {
    console.log(msg)
  }
}
function pushRequest (config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  if (config.loading) {
    store.dispatch('loading')
  }
}
function popRequest (config) {
  log(`${config.url}--end`)
  remove(_requests, r => {
    return r === config
  })
  if (!_requests.length) {
    setTimeout(() => {
      store.dispatch('loading', false)
    }, 300)
  }
}
axios.defaults.baseURL = appConfig.BASE_URL
const interceptorsRequest = config => {
  if (!config.params) {
    config.params = {}
  }
  if (store.getters.token) {
    config.params.tokenId = store.getters.token
  }
  config.params.requestTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  config.params.account = 'zuimei'

  if (!(config.data instanceof FormData)) {
    let configData = JSON.parse(JSON.stringify(config.data))
    Object.keys(configData).forEach(key => {
      if (typeof configData[key] !== 'string') {
        configData[key] = JSON.stringify(configData[key])
      }
    })

    config.data = configData
  }

  sign(config.params, config.data, 'verifyInfo')
  return config
}
const interceptorsResponse = config => {
  return config
}
export default ({
  url,
  data,
  params,
  method = 'POST',
  isSilence = false,
  path = '',
  noTimeout = false,
  isOut = false,
  loading = true
} = {}) => {
  // eslint-disable-next-line
  let _params = params || data || {};
  if (!(_params instanceof FormData)) {
    _params = JSON.parse(JSON.stringify(_params))
  }

  // 处理旧接口和新接口
  // let oldIndex = url.indexOf('/systemApi')
  // end
  const _opts = {
    method,
    // url: `${path}${oldIndex !== -1 ? url : `/platApi${url}`}`
    url,
    loading
  }
  let _timer = null
  if (method.toLocaleUpperCase() === 'POST') {
    _opts.data = _params
  } else {
    _opts.params = _params
  }
  const instance = axios.create({
    timeout: noTimeout ? 0 : 30000,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'app-id': appConfig.APP_ID,
      'api-version': appConfig.API_VERSION
    }
  })
  instance.interceptors.request.use(config => interceptorsRequest(config))
  instance.interceptors.response.use(
    config => interceptorsResponse(config)
  )
  return new Promise((resolve, reject) => {
    const _random = { stamp: Date.now(), url: _opts.url, loading: _opts.loading }
    const isGetUrl = url.indexOf('/get') !== -1 // get数据请求小于时间数不加loading层
    if (!isSilence) {
      _timer = setTimeout(
        () => {
          pushRequest(_random)
        },
        isGetUrl ? MINI_TIME : 0
      )
    }
    instance(_opts)
      .then(response => {
        clearTimeout(_timer)
        popRequest(_random)
        const res = response && response.data
        if (!res) {
          Message({
            message: '接口不存在或网络有问题！',
            type: 'error',
            duration: 3 * 1000
          })
          return
        }
        // 不同类型的返回
        const contentType = response && response.headers['content-type']
        if (/^image\/png.*/.test(contentType)) {
          return resolve(res)
        } else if (contentType && contentType.indexOf('vnd.ms-excel') !== -1) {
          const fileName =
            response &&
            response.headers['content-disposition'].replace(
              'attachment;filename=',
              ''
            )
          return resolve({ res, fileName })
        }
        if (res.status.toString() === '00000') {
          if (isOut) {
            return resolve(res)
          } else {
            return resolve(res.data)
          }
        } else {
          if (res.status === '10005') {
            store.dispatch('LogOut')
          }
          Message({
            message: res.content || '未知异常',
            type: 'error',
            duration: 3 * 1000
          })
          return reject(res)
        }
      })
      .catch(error => {
        if (!isSilence) {
          _timer = setTimeout(
            () => {
              popRequest(_random)
            },
            isGetUrl ? MINI_TIME : 0
          )
        }
        const isNotFound = error.message.indexOf('404') > -1
        Message({
          message: isNotFound ? '接口不存在' : (error.message || '未知异常'),
          type: 'error',
          duration: 5 * 1000
        })
        return reject(error)
      })
  })
}
