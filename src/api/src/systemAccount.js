import generateApiFn from '../generateApiFn'
const _module = '/systemAccount'
const commonOption = {}
// 主页列表
const apiUrlObj = {
  login: commonOption // 登陆
}

const systemAccountApis = generateApiFn(_module, apiUrlObj)
systemAccountApis.logout = () => { return Promise.resolve() }

export default systemAccountApis
