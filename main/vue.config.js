/*
 * @Author: 五道杠
 */
module.exports = {
  lintOnSave: false,
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun-表头'
        return args
      })
  }
}
