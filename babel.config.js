const res = {
  presets: ['@vue/app'],
  plugins: [
    'add-module-exports',
    [
      '@babel/plugin-transform-modules-commonjs', // Object(...) is not function
      {
        allowTopLevelThis: true
      }
    ]
    // 'jsx-v-model',
    // 'transform-vue-jsx'
  ]
}

if (process.env.NODE_ENV === 'development') {
  // 解决热更新编译速度慢问题：安装插件 babel-plugin-dynamic-import-node
  // 原文链接：https://www.cnblogs.com/codebook/p/13605271.html
  res.env = {
    development: {
      plugins: ['dynamic-import-node']
    }
  }
}

module.exports = res
