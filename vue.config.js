const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// module.exports = {
//   lintOnSave:false  //关闭语法检查
// }
//打包配置文件
module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
};
