module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8888/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
