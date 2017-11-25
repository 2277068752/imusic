'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  postcss: [
    require('postcss-pxtorem')({
      rootValue: 75, // 这里对应的是750的设计图尺寸
      unitPrecision: 5, // 保留几位小数
      replace: true,
      selectorBlackList: ['active'], // selectorBlackList则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
      mediaQuery: true,
      minPixelValue: 12, // 意思是所有小于12px的样式都不被转换
      propList: ['*', '!border*'] // 意思是排除带有border的属性
    }),
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    })
  ]
}
