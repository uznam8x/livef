const parse = (v) => `${v[0]}="${v[1]}"`;
export default (args, next) => {
  const { props = {}, attrs = {} } = args;
  const str = Object.entries(attrs).map(parse).join(' ');
  const html = `<!doctype html><html ${str}>${['head', 'body']
    .map((v) => props[v] || '')
    .join('')}</html>`;

  next(null, { ...args, props: { html } });
};
