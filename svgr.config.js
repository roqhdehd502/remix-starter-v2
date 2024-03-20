module.exports = {
  plugins: [
    '@svgr/plugin-svgo',
    '@svgr/plugin-jsx',
    '@svgr/plugin-prettier',
  ],
  typescript: true,
  filenameCase: 'kebab',
  jsxRuntime: 'automatic',
  svgo: false,
};
