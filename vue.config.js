const { defineConfig } = require("@vue/cli-service");
// 版本设置 防止缓存 目前取时间戳
const Version = new Date().getTime();
const assetsDir = 'webAssets'
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir, //静态资源目录（js, css, img）
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        target: 'https://demo.chenzeou.com.cn/', // 测试地址
        changeOrigin: true
      }
    }
  },
  // 修改webpack的配置
  configureWebpack: {
    output: {
      filename: `${assetsDir}/js/[name].${Version}.js`,
      chunkFilename: `${assetsDir}/js/[name].${Version}.js`,
    },
  },
});