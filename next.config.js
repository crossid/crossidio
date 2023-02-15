const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  env: {
    intercomAppId: 'j176kjoq',
    gaTracking: 'UA-157001541-1',
  },
}

module.exports = withMarkdoc()(nextConfig)
