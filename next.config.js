/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_ENV: process.env.NODE_ENV,
    API_DEVELOPMENT: process.env.API_DEVELOPMENT,
  },
};

module.exports = nextConfig;
