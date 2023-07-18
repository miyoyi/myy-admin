// 防抖函数
// debounce 函数接受一个函数和延迟执行的时间作为参数
export default function debounce (fn, delay) {
  // 维护一个 timer
  let timer = null

  return function () {
    // 获取函数的作用域和变量
    const context = this
    const args = arguments

    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
