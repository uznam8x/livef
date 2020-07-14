const async = require('async');

const imt = (args, next) => {
  args.source = args.source || [];
  args.source.push(`import { waterfall } from 'async';`);
  const tpl = args.blueprint.index || {};
  args.source = args.source.concat(
    Object.entries(tpl).map((v) => `import _${v[0]} from './${v[0]}';`)
  );
  next(null, args);
};

const task = (tpl = [], args = null) => {
  return tpl
    .map((v) => {
      let code = `_${v.subject}`;
      if (v.tasks && v.tasks.length) {
        code = `${code}, (args, callback) => { args.current = '${
          v.subject
        }'; ${group(v.tasks, args || {}, true)} }`;
      }
      return code;
    })
    .join(',');
};
const group = (tpl = []) => {
  let code = [];
  if (tpl.length) {
    code = [
      `waterfall([`,
      '(callback) => { callback(null, args) }, ',
      task(tpl),
      `],callback) `,
    ];
  }
  return code.join('\n');
};

const exec = (args, callback) => {
  args.source = args.source || [];
  const tpl = args.blueprint.flow || [];
  args.source.push(
    [
      `const service = (args, callback) => {`,

      group(tpl),
      `}`,
      `service({}, (err, res) => {  });`,
    ].join('\n')
  );
  callback(null, args);
};

module.exports = (args, next) => {
  async.waterfall(
    [
      (cb) => {
        cb(null, args);
      },
      imt,
      exec,
    ],
    (err, res) => {
      next(null, args);
    }
  );
};
