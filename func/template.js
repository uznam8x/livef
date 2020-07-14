module.exports = {
  dependercy: `import * as R from 'ramda';`,
  promise: `(() => new Promise((resolve) => resolve({})))(){{pipeline}}.then({{output}});`,
  pipe: `const pipe = (...fns) => Promise.all(fns).then((res) => res.reduce((a, b) => R.mergeDeepWith(R.concat, a, b), {}) );`,
  task: `const task = R.curry((fn, args) => new Promise((resolve, reject) => {
    fn.bind(null, { props: args })((err, res) => {
      err ? reject(err) : resolve(res)
    });
  }));`,
  component: 'export default (args, next) => { next(null, args) }',
  entry: 'export default (args, next) => { console.log(args) }',
};
