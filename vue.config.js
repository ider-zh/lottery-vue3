module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api/': {
        // target: 'http://127.0.0.1:8888/api/',
        target: 'http://ider.wuzhen.ai:6688/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
