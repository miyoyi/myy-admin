/**
 * Created by GanQianZhao on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
const validUserName = str => {
  return str.trim() >= 0
}
const PHONE = (rule, value, callback) => {
  var points = /^\d{7,12}$/
  if (value !== '' && !points.test(value)) {
    callback(new Error('请输入正确的联系号码'))
  } else {
    callback()
  }
}
export const standerPhone = (rule, value, callback) => {
  // console.log('phone')
  var points = /^1[3456789]\d{9}$/
  if (value !== '' && !points.test(value)) {
    callback(new Error('请输入正确的联系号码'))
  } else {
    callback()
  }
}

const EMAIL = (rule, value, callback) => {
  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value !== '' && !reg.test(value)) {
    callback(new Error('请输入正确格式的邮箱'))
  } else {
    callback()
  }
}

export const standEmail = (rule, value, callback) => {
  console.log(value, 'email')
  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value !== '' && !reg.test(value)) {
    callback(new Error('请输入正确格式的邮箱'))
  } else {
    callback()
  }
}

const CUR_DATE_LIMIT = (rule, value, callback) => {
  if (typeof value === 'object' && new Date().valueOf() <= value.valueOf()) {
    callback(new Error('不能选将来时间'))
  } else {
    callback()
  }
}

const POINT_LIMIT = (rule, value, callback) => {
  var points = /^\d{1,7}(\.\d{1,2})?$/
  if (value && value !== '' && !points.test(value)) {
    callback(new Error('整数小于7位且小数点不能超过两位'))
  } else {
    callback()
  }
}

const VALIDATE_ID_CARD = (rule, value, callback) => {
  var points = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/
  if (value != null && value !== '' && !points.test(value)) {
    callback(new Error('身份证号码格式有误'))
  } else {
    callback()
  }
}
const CARGO_SECTION = (rule, value, callback, source) => {
  if (!source.c_name || rule.field !== rule.file) {
    callback()
    return
  }

  if (value === '') {
    callback(new Error('该字段不能为空'))
  } else {
    callback()
  }
  return false
}
export function isPositiveInteger (s) {
  var re = /^[0-9]+$/
  return re.test(s)
}
export const STRING_NUMBER = (rule, value, callback) => {
  const reg = new RegExp('^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$')
  // console.log(value)
  if (!value) {
    callback(new Error('请输入正确的金额!'))
  } else if (reg.test(value) === false) {
    callback(new Error('请输入最多包含2位小数的正数!'))
  } else {
    callback()
  }
}
const INTEGER = (rule, value, cb) => {
  // console.log(rule, value)
  if (!/^[1-9]{1,}[\d]*$/.test(+value)) {
    cb(new Error('请输入正整数!'))
  } else {
    cb()
  }
}

// 大于等于0的数
const ISPOSITIVE = (rule, value, cb) => {
  if (!/^\d+(?=\.{0,1}\d+$|$)/.test(+value)) {
    cb(new Error('请输入大于等于0的数!'))
  } else {
    cb()
  }
}
// 是否为正数 （不包括0）
const ISINTEGER = (rule, value, cb) => {
  if (!/^[1-9]\d*(\.\d+)?$|^0\.\d*[1-9]$/.test(+value)) {
    cb(new Error('请输入正数!'))
  } else {
    cb()
  }
}

// 限制范围1~100的正整数 （不包括0）
const INTEGER_LIMIT = (rule, value, cb) => {
  const reg = new RegExp('^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$')
  if (reg.test(value) === false) {
    cb(new Error('请输入最多包含2位小数的正数!'))
  } else if (+value <= 0 || +value > 100) {
    cb(new Error('请输入1~100的正整数!'))
  } else {
    cb()
  }
}

const REQUIRED = ({ message = '不能为空', trigger = 'blur' } = {}) => {
  return { required: true, message: message, trigger: trigger }
}
const MAX = ({
  type = 'string',
  message = '不能多于1位',
  trigger = 'blur',
  max = 1
} = {}) => {
  return { type: type, max: max, message: message, trigger: trigger }
}
const MIN = ({
  type = 'string',
  message = '不能少于1位',
  trigger = 'blur',
  min = 1
} = {}) => {
  return { type: type, min: min, message: message, trigger: trigger }
}

export default {
  idCard: VALIDATE_ID_CARD,
  phone: PHONE,
  standerPhone,
  isPositive: ISPOSITIVE,
  isInteger: ISINTEGER,
  required: REQUIRED,
  max: MAX,
  min: MIN,
  email: EMAIL,
  pointLimit: POINT_LIMIT,
  cargoSection: CARGO_SECTION,
  curDateLimit: CUR_DATE_LIMIT,
  stringNumber: STRING_NUMBER,
  integer: INTEGER,
  validUserName,
  isExternal,
  integerLimit: INTEGER_LIMIT
}
