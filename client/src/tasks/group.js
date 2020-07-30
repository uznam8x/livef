import { flatten } from 'ramda';
export default (args, next) => {
  next(null, {
    tagName: 'g',
    attributes: {},
    children: flatten([args]),
  });
};
