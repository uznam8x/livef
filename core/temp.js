const path = require('path');
const mkdirp = require('mkdirp');
module.exports = (args, next) => {
  const _tmp = path.resolve(__dirname, '../_tmp/');
  mkdirp.sync(_tmp);
  args.tmp = _tmp;
  next(null, args);
};
