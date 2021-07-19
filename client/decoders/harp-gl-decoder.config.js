const path = require('path');

module.exports = {
  target: 'webworker',
  entry: {
    decoder: './decoders/harp-gl-decoders.js',
  },
  output: {
    path: path.join(process.cwd(), 'public'),
    filename: '[name].bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
};
