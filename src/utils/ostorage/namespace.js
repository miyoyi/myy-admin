import * as names from './local/names'

export default () => {
  return localStorage.getItem(names.LOGIN_TYPE) || '1'
}
