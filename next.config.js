/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/deepsignal-ai-investment' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/deepsignal-ai-investment' : ''
}

module.exports = nextConfig