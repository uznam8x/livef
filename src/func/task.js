import * as R from 'ramda';
export default R.curry(
  (fn, args) =>
    new Promise((resolve, reject) => {
      fn.bind(
        null,
        args
      )((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
);
