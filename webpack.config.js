var path = require('path');
var paths = {
  OUT: 'public/dist',
  ENTRY_POINT: 'public/src/index.js',
};
var config = {};

config.entry = path.join(__dirname, paths.ENTRY_POINT);

config.output = {
  path: path.join(__dirname, paths.OUT),
  filename: 'bundle.js',
};

config.module = {
  loaders: [
    {
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
      },
      include: [path.join(__dirname, 'public/js')],
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
  ],
};

config.resolve = {
  modulesDirectories: ['node_modules'],
  extensions: ['', '.js', 'jsx', 'json'],
  root: path.resolve('./public/src'),
};

config.node = {
  net: 'empty',
  tls: 'empty',
  fs: 'empty',
};

module.exports = config;
