import { flatten } from 'ramda';

export default (args, next) => {
  next(null, {
    tagName: 'svg',
    attributes: {},
    children: flatten([args]),
  });
};
