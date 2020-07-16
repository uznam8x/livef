export default (args, next) => {
  const { props = {} } = args;
  const body = '<body></body>';
  next(null, { body });
};
