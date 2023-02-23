const withMarkdoc = require('@markdoc/next.js')
const { createLoader } = require('simple-functional-loader')
const {
  tokenizeCode,
  simplifyToken,
  normalizeTokens,
} = require('./src/utils/prism/token')
const { highlight } = require('./src/utils/prism/highlight')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://manage.local.crossid.io/api/:path*', // proxy to management
      },
    ]
  },
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  // TODO we better store all images in our project
  images: {
    remotePatterns: [
      // required for  google integration logo
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/thumb/5/53/**',
      },
    ],
  },
  env: {
    intercomAppId: 'j176kjoq',
    gaTracking: 'UA-157001541-1',
  },
  webpack(config, options) {
    config.module.rules.push({
      resourceQuery: /highlight/,
      use: [
        options.defaultLoaders.babel,
        createLoader(function (source) {
          let lang =
            new URLSearchParams(this.resourceQuery).get('highlight') ||
            this.resourcePath.split('.').pop()

          const tokens = tokenizeCode(source, lang)

          return `
            export const tokens = ${JSON.stringify(tokens.map(simplifyToken))}
            export const lines = ${JSON.stringify(normalizeTokens(tokens))}
            export const code = ${JSON.stringify(source)}
            export const highlightedCode = ${JSON.stringify(
              highlight(source, lang)
            )}  
          `
        }),
      ],
    })

    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://manage.local.crossid.io/api/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = withMarkdoc()(nextConfig)
