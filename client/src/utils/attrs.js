import * as R from 'ramda';
import node from '../components/node';

export default {
  set: R.curry((args, el) => {
    for (let key in args) {
      el.attr(key, args[key]);
    }
  }),
  get: (key, el) => {
    el.attr(key);
  },
};
