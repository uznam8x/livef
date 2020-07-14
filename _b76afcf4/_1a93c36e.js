const node = (arr = []) => arr.join('');
export default (args, next) => {
  const head = `<head>${node(
    ['title', 'meta', 'link', 'style', 'script'].map((v) => node(args.props[v]))
  )}</head>`;

  next(null, { ...args, props: { head } });
};
