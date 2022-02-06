const path = require('path');
const mix = require('laravel-mix');
const nodeExternals = require('webpack-node-externals');

mix
  .setPublicPath('.')
  .options({ manifest: false })
  .ts('resources/js/ssr.js', 'dist/js')
  .react()
  .alias({ '@': path.resolve('resources/js') })
  .webpackConfig({
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
      alias: {
        ziggy: path.resolve('vendor/tightenco/ziggy/src/js'),
      },
    },
  });
