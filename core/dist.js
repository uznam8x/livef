const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
module.exports = (args, next) => {
  const dist = path.resolve(__dirname, '../dist/');
  rimraf.sync(dist);
  mkdirp.sync(dist);
  next(null, args);
};
