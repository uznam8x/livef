const parse = (v) => `${v[0]}="${v[1]}"`;
export default (args, next) => {
  const { attrs = {} } = args;
  const str = Object.entries(attrs).map(parse).join(' ');

  const props = args.props || {};
  const meta = (props.meta || []).concat([`<meta ${str} />`]);
  next(null, { ...args, props: { meta } });
};
