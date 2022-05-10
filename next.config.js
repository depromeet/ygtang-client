const withPlugins = require('next-compose-plugins');
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_ENV: process.env.NODE_ENV,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withPlugins(
  [
    withSentryConfig({ nextConfig }, sentryWebpackPluginOptions),
    withBundleAnalyzer({
      compress: true,
      webpack(config) {
        const plugins = [...config.plugins, new CompressionPlugin()];
        return { ...config, plugins };
      },
    }),
  ],
  nextConfig
);
