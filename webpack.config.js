const path = require('path');
module.exports = {
  mode: 'production',
  module: {
    rules: [],
  },

  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: 'index.js',
  },
  target: 'web',
};
