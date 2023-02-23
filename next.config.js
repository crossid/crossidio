const withMarkdoc = require('@markdoc/next.js')
const { createLoader } = require('simple-functional-loader')
const Prism = require('prismjs')
const {
  highlightCode,
  fixSelectorEscapeTokens,
  simplifyToken,
  normalizeTokens,
} = require('./src/utils/tokens')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  // TODO we better store all images in our projec
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
          let isDiff = lang.startsWith('diff-')
          let prismLang = isDiff ? lang.substr(5) : lang

          // TODO this is a hack until we'll have a syntax for vue
          // https://github.com/PrismJS/prism/issues/1665
          if (prismLang === 'vue') {
            prismLang = 'html'
          }

          let grammar = Prism.languages[isDiff ? 'diff' : prismLang]
          let tokens = Prism.tokenize(source, grammar, lang)

          if (lang === 'css') {
            fixSelectorEscapeTokens(tokens)
          }

          return `
            export const tokens = ${JSON.stringify(tokens.map(simplifyToken))}
            export const lines = ${JSON.stringify(normalizeTokens(tokens))}
            export const code = ${JSON.stringify(source)}
            export const highlightedCode = ${JSON.stringify(
              highlightCode(source, lang)
            )}
          `
        }),
      ],
    })

    return config
  },
}

module.exports = withMarkdoc()(nextConfig)
