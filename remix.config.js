/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  postcss: true,
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'cjs',
  dev: {
    port: 8080,
  },
  browserNodeBuiltinsPolyfill: {
    modules: {
      fs: true,
      worker_threads: true,
      process: true,
      'stream/web': true,
      buffer: true,
    },
  },
};
