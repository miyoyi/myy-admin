// api 文件以统一格式 export function xxx 输出
export const requireContentObject = (r, exinclude) => {
  let contents = {}
  const paths = r.keys().filter((p) => {
    return exinclude.indexOf(p) === -1
  })
  for (const p of paths) {
    const fn = r(p).default ? r(p).default : r(p)
    // const k = p.match(/(\w+-?\w+).js$/)[1]
    contents = { ...contents, ...fn }
  }
  return contents
}
const filter = requireContentObject(require.context('./src', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js', './src/test.js'])
export default filter
