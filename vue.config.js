module.exports = {
  publicPath: '', // 对应 webpack 中的 output.publicPath
  outputDir: 'manbing', // 对应 webpack 中的 output.path
  lintOnSave: false, //是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
  // transpileDependencies: [ /* string or regex */ ],
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/apis': {
        target: 'http://search.kuwo.cn', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/ks': '' //请求的时候使用这个api就可以
        }
      },
      // '/kp': {
      //   target: 'http://antiserver.kuwo.cn', //这里后台的地址模拟的;应该填写你们真实的后台接口
      //   ws: true,
      //   changOrigin: true, //允许跨域
      //   pathRewrite: {
      //   '^/kp': '' //请求的时候使用这个api就可以
      //   }
      // }
    }
  },
};