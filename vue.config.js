const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'webAssets', //静态资源目录（js, css, img）
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
});