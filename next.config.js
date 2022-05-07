/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
