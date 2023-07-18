// 小数计算加法
export const accAdd = (arg1, arg2) => {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  // 这里Math.max(r1, r2)取最长的小数位
  // Math.ceil(length / 3) * 3) 按照位数计算乘以的倍数.比如 2 => 1000, 4 => 1000000
  m = Math.pow(10, Math.ceil(Math.max(r1, r2) / 3) * 3)
  return (arg1 * m + arg2 * m) / m
}
// 获取两个数组之间的不同元素并返回其组成的新数组
export const getArrDifference = (arr1, arr2) => {
  return arr1.concat(arr2).filter(function (v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
}
