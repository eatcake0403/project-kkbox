module.exports = {
  devServer: {
    https: true,
    proxy: {
      '/podcasts': {
        target: 'https://feeds.soundon.fm',
        changeOrigin: true
      }
    }
  }
}
