/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_ENV: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;
