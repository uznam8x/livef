const parse = (v) => `${v[0]}="${v[1]}"`;
export default (args, next) => {
  const { attrs = {} } = args;
  const str = Object.entries(attrs).map(parse).join(' ');
  const meta = [`<meta ${str} />`];
  next(null, { meta });
};
