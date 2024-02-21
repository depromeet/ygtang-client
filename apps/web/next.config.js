// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    APP_ENV: process.env.NODE_ENV,
    API_DEVELOPMENT: process.env.API_DEVELOPMENT,
    WEB_VERSION: version,
  },
  compiler: {
    emotion: true,
  },
  compress: true,
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin:
      process.env.SENTRY_WEBPACK_PLUGIN_ENABLE !== "true",
    disableClientWebpackPlugin:
      process.env.SENTRY_WEBPACK_PLUGIN_ENABLE !== "true",
  },
};
