/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

module.exports = nextConfig;
