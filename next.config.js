const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
// next 内置了 withCss 的处理
module.exports = withPlugins([
  [
    optimizedImages,
    {
      inlineImageLimit: 8192,
      imagesFolder: 'images',
      imagesName: '[name]-[hash].[ext]',
      handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
      removeOriginalExtension: false,
      optimizeImages: false
    }
  ],
  {
    env: process.env.PLATFORM,
    devIndicator: {
      autoPrerender: false
    },
    redirects() {
      return [
        process.env.PLATFORM === 'one' && {
          source: '/',
          destination: '/one',
          permanent: true
        }
      ].filter(Boolean)
    }
  }
])
