/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'xtn3ssr7fhmmc7d1.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
