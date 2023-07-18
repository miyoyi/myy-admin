module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 'extends': [
  //   'plugin:vue/essential',
  //   '@vue/standard'
  // ],
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/standard', '@vue/typescript'],
  plugins: ['vue'],
  rules: {
    'no-async-promise-executor': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'error'
    'space-before-function-paren': 0,
    'no-debugger': 0,
    'no-useless-return': 0,
    'no-dupe-else-if': 0,
    'no-prototype-builtins': 0,
    'no-import-assign': 0,
    'no-setter-return': 0,
    'object-curly-spacing': [0, 'never'], // 大括号内空格一致
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0,
    'vue/attributes-order': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-v-html': 0,
    'vue/require-default-prop': 0,
    'vue/require-valid-default-prop': 0,
    'vue/mustache-interpolation-spacing': 0, // {{ 文字前后空格 }}
    'vue/html-indent': 0,
    'vue/no-template-shadow': 0,
    'vue/require-prop-types': 0,
    'prefer-promise-reject-errors': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/require-prop-type-constructor': 0,
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'fetch',
          'asyncData',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          'head',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
  },
  parserOptions: {
    // parser: "babel-eslint",
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  globals: {
    BMap: false,
    // 以下是有文件使用未定义字段，暂时先不校验
    BMAP_NORMAL_MAP: false,
    BMAP_HYBRID_MAP: false,
    BMAP_ANCHOR_TOP_LEFT: false,
    BMAP_NAVIGATION_CONTROL_LARGE: false,
    BMAP_ANCHOR_BOTTOM_RIGHT: false,
    BMAP_ANCHOR_BOTTOM_LEFT: false
  }
}
