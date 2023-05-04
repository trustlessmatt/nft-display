/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "metadata.degods.com**",
      },
      {
        protocol: "https",
        hostname: "arweave.net**",
      },
    ],
  },
};

module.exports = nextConfig;
