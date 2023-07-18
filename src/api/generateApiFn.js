import axios from '@/utils/fetch'
// 通过api配置对象生成方法
export default (moduleName, apiUrlObj) => {
  let obj = {}
  const arr = Object.keys(apiUrlObj)
  for (let i in arr) {
    obj[arr[i]] = params => {
      return axios({
        url: `${moduleName}/${arr[i]}`,
        params,
        ...apiUrlObj[arr[i]]
      })
    }
  }
  return obj
}
