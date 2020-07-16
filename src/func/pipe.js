import * as R from 'ramda';
export default (...fns) =>
  Promise.all(fns).then((res) =>
    res.reduce((a, b) => R.mergeDeepWith(R.concat, a, b), {})
  );
