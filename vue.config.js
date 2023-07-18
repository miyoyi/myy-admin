'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const _env = process.env.NODE_ENV
const isProduction = _env === 'production'
const _flag = process.env.VUE_APP_FLAG
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const cdn = {
  // css: ['xxx.css', 'sss.js'],
  js: [
    'https://public-oss-file.zmaxfilm.com/cnd/echarts.min.js',
    'https://public-oss-file.zmaxfilm.com/cnd/vue.min.js',
    'https://public-oss-file.zmaxfilm.com/cnd/axios.min.js',
    'https://public-oss-file.zmaxfilm.com/cnd/vue-router.min.js',
    'https://public-oss-file.zmaxfilm.com/cnd/vuex.min.js'
    // '//webapi.amap.com/maps?v=1.4.15&key=08a5f5ad200e8743d05eeaf24990cfc9&plugin=AMap.Geocoder'
  ]
}
function resolve (dir) {
  return path.join(__dirname, dir)
}
console.log(process.env.NODE_ENV, _flag)
console.log(process.argv)
const name = 'myy-admin' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 8080 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: _env === 'development' ? '/' : './',
  // publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  transpileDependencies: [
    'vue2-editor',
    'resize-detector',
    'element-ui'
  ],
  devServer: {
    // before: require('./src/mock/mock-server.js'), // mock
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    host: '0.0.0.0',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://tkzc-release-napi.zmaxfilm.com/crm/api/',
        // target: `http://localhost:${port}/crm/api/`,
        changeOrigin: true, // set the option changeOrigin to true for name-based virtual hosted sit
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: config => {
    config.performance = {
      hints: false
    }
    config.name = name
    if (process.env.NODE_ENV !== 'development') {
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        AMap: 'AMap'
        // 'element-ui': 'ELEMENT',
      }
      if (process.env.VUE_APP_FLAG === 'prod') {
        config.plugins.push(
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          })
        )
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_debugger: true,
                drop_console: true
              }
            },
            sourceMap: false,
            parallel: true
          })
        )
      }
    }
  },
  chainWebpack (config) {
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // config.module
    //   .rule('ts-loader')
    //   .test(/\.tsx?$/)
    //   .exclude.add(resolve('node_modules'))
    //   .end()
    //   .use('ts-loader')
    //   .loader('ts-loader')
    //   .options({
    //     appendTsSuffixTo: [/\.vue$/]
    //   })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('styles', path.resolve(__dirname, './src/styles'))
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(isProduction && process.env.VUE_APP_FLAG === 'test', config =>
        config.devtool('cheap-source-map')
      )
    console.log(process.env.VUE_APP_FLAG === 'test')
    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  }
}
