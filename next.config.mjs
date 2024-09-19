/** @type {import('next').NextConfig} */
const nextConfig = {
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
