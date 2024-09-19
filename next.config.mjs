/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.giphy.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'media1.tenor.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'media.cdn-jaguarlandrover.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'content.presspage.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
