/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['prisma']
  },
  images: {
    domains: ['localhost']
  }
}

module.exports = nextConfig
