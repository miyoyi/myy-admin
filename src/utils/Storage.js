function Storage (options = {}) {
  this.locKey = options.locKey || 'sessionStorage'
  this.fkey = options.LOC || 'LOC'
}

Storage.prototype.getKey = function (name) {
  return this.fkey + '_' + name
}

Storage.prototype.getLoc = function () {
  return window[this.locKey]
}

Storage.prototype.set = function (name, value) {
  const key = this.getKey(name)
  let _value = value || ''
  if (typeof _value === 'object') {
    _value = JSON.stringify(_value)
  }
  this.getLoc().setItem(key, _value)
}

Storage.prototype.remove = function (name) {
  const key = this.getKey(name)
  this.getLoc().removeItem(key)
}

// def 默认值 如果没数据 取默认值
Storage.prototype.get = function (name, def = '') {
  const key = this.getKey(name)
  const loc = this.getLoc()
  const value = loc.getItem(key)
  if (typeof def !== 'string') {
    return (value && JSON.parse(value)) || def
  }
  return value || def
}

export default Storage
