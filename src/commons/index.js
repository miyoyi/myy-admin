
export const requireFolderName = (r, exinclude) => {
  const contents = {}
  const paths = r.keys().filter((p) => {
    return exinclude.indexOf(p) === -1
  })
  for (const p of paths) {
    const fn = r(p).default ? r(p).default : r(p)
    const _array = p.split('/')
    const index = _array.findIndex((item) => item === 'index.vue')
    contents[_array[index - 1]] = fn
  }
  return contents
}
const components = requireFolderName(
  require.context('./', true, /^\.\/[\s\S]+\/index.vue$/),
  ['./index.js'],
  'vue'
)
// export default components

export default {
  install (Vue, options) {
    for (let key in components) {
      Vue.component(key, components[key])
    }
  }
}
