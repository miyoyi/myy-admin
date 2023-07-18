
import dayjs from 'dayjs'
/**
 * Created by GanQianZhao on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
// webpack require.context 转为数组包装函数
// export 使用 default
export const cloneObj = obj => {
  if (!obj) return obj
  if (typeof obj !== 'object') return obj
  if (obj instanceof Array) {
    let res = []
    obj.forEach(item => res.push(cloneObj(item)))
    return res
  } else {
    let res = {}
    for (let key in obj) {
      res[key] = cloneObj(obj[key])
    }
    return res
  }
}
export const getChildMenus = node => {
  var menuArry = []
  function getChild (item) {
    item.forEach(_item => {
      if (_item.children && _item.children.length) {
        if (!_item.meta) _item.meta = {}
        const tempPn = _item.meta.parentName && _item.meta.parentName.slice(0)
        _item.meta.parentName = _item.meta.parentName ? tempPn : []
        // if (!_item.meta.hasChild) {
        _item.meta.parentName.push(_item.meta.title || '')
        // }
        const chMap = _item.children.map(ch => {
          let clone = Object.assign({}, ch)
          // if (ch.children && ch.name === 'couponDistribute') {
          //   delete clone.children
          // }
          return {
            ...clone,
            meta: {
              ...ch.meta,
              parentName: _item.meta.parentName
            }
          }
        })
        getChild(chMap)
        if (_item.meta && _item.meta.hasChild) {
          menuArry.push(Object.assign({}, _item, { children: [] }))
        }
      } else {
        menuArry = [...menuArry, _item]
      }
      // if (_item.meta && _item.meta.hasChild) {
      // menuArry.push(Object.assign({}, _item, { children: [] }))
      // }
    })
  }
  getChild(node)
  return menuArry
}
// 路由扁平化为数组函数
export const requireRoutesArray = (r, exinclude) => {
  let contents = []
  const paths = r.keys().filter(p => {
    return exinclude.indexOf(p) === -1
  })
  for (const p of paths) {
    const fn = r(p).default ? r(p).default : r(p)
    if (fn instanceof Array) {
      contents = [...contents, ...getChildMenus(fn)]
    } else if (fn instanceof Object) {
      contents.push(fn)
    }
  }
  return contents
}
export const requireMenusArray = (r, exinclude) => {
  let contents = []
  const paths = r.keys().filter(p => {
    return exinclude.indexOf(p) === -1
  })
  for (const p of paths) {
    const fn = r(p).default ? r(p).default : r(p)
    if (fn instanceof Array) {
      contents = [...contents, ...fn]
    } else if (fn instanceof Object) {
      contents.push(fn)
    }
  }
  return contents
}
// api 扁平化按文件／文件夹生成对象
export const requireFolderObj = (r, exinclude) => {
  const contents = {}
  const paths = r.keys().filter(p => {
    return exinclude.indexOf(p) === -1
  })
  for (const path of paths) {
    const pArray = path.split('/').slice(1)
    const l = pArray.length
    const fn = r(path).default || r(path)
    let utilObj = contents
    pArray[l - 1] = pArray[l - 1].match(/(\w+-?\w+).js$/)[1]

    for (let i = 0; i < l; i++) {
      const p = pArray[i]
      if (i < l - 1) {
        if (!contents[p]) {
          contents[p] = {}
        }
        utilObj = contents[p]
      } else if (i === l - 1) {
        utilObj[p] = fn
      }
    }
  }
  return contents
}
// 组件
export const requireFolderName = (r, exinclude) => {
  const contents = {}
  const paths = r.keys().filter(p => {
    return exinclude.indexOf(p) === -1
  })
  for (const p of paths) {
    const fn = r(p).default ? r(p).default : r(p)
    const _array = p.split('/')
    const index = _array.findIndex(item => item === 'index.vue')
    contents[_array[index - 1]] = fn
  }
  return contents
}
export const eachOwn = (obj, fn) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(obj[key], key, obj)
    }
  }
}

// 可以深层次拷贝
export const realDeepClone = (sourceObj, targetObj) => {
  let cloneObj = targetObj || {}
  if (!sourceObj || typeof sourceObj !== 'object') {
    return sourceObj
  }
  if (sourceObj.length) {
    cloneObj = sourceObj.map(e => {
      return realDeepClone(e)
    })
    return cloneObj
  }
  for (const i in sourceObj) {
    // if (sourceObj[i] && typeof sourceObj[i] === 'object' && sourceObj[i].length) {
    if (sourceObj[i] && typeof sourceObj[i] === 'object') {
      cloneObj[i] = realDeepClone(sourceObj[i], {})
    } else {
      cloneObj[i] = sourceObj[i]
    }
  }
  return cloneObj
}
// 数组为空判断
export const judgeArrFill = value => {
  const noFill =
    value &&
    value.filter(i => {
      const arr = Object.keys(i).filter(key => {
        return i[key] === null || i[key] === '' || i[key] === undefined
      })
      return arr.length > 0
    })
  return noFill
}

// 拷贝对象
export const deep = (obj) => JSON.parse(JSON.stringify(obj))

// 时间转化格式
export const dft = (v, format = 'YYYY-MM-DD', defaultValue = '') => {
  if (!v) {
    return defaultValue
  } else if (v === 'now') {
    return dayjs().format(format)
  }
  return dayjs(v).format(format)
}
// 单词转首字母大写
export const firstUpperCase = function (str) {
  return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2
  })
}
export const lazyComponent = (name, index = true) => () => Promise.resolve(require(`@/views/${name}${index ? '/index' : ''}.vue`))
// export const lazyComponent = (name, index = true) => () => import(`@/views/${name}${index ? '/index' : ''}.vue`)

// 对象数组去重
export const removeDuplication = (arr, pk = 'id') => {
  let obj = {} // 初始值为空的对象，用来存放已存在的对象的属性
  let newArr = arr.reduce(function (prev, cur) {
    if (!obj[cur[pk]]) {
      obj[cur[pk]] = true
      prev.push(cur) // _id为每个对象独有的标识，即用来判断去重的标识
    }
    return prev
  }, [])
  return newArr
}
