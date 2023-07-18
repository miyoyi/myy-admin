import generateApiFn from '../generateApiFn'
const _module = '/public'
const commonOption = {}
// 主页列表
const apiUrlObj = {
  login: commonOption, // 用户登录
  getUserInfo: commonOption // 获取登录者用户信息
}

const publicApis = generateApiFn(_module, apiUrlObj)
publicApis.logout = () => { return Promise.resolve() }

export default publicApis
