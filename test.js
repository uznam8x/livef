const async = require('async');
const R = require('ramda');
const beautify = require('js-beautify').html;

function head(req = {}, next) {
  const node = (arr = []) => arr.join('');

  next(null, {
    head: `<head>${node(
      ['title', 'meta', 'link', 'style', 'script'].map((v) =>
        node(req.props[v])
      )
    )}</head>`,
  });
}

function style(req = {}, next) {
  let str = `<style type="text/css"></style>`;
  next(null, { style: [str] });
}

function link(req = {}, next) {
  let str = `<link></link>`;
  next(null, { link: [str] });
}

function script(req = {}, next) {
  let str = `<script></script>`;
  next(null, { script: [str] });
}

function title(req = {}, next) {
  let str = `<title></title>`;
  next(null, { title: [str] });
}

function element(req = {}, next) {
  let str = '';
  if (req.props.hasOwnProperty('tag')) {
    const { tag } = req.props;
    str = `<${tag}></${tag}>`;
  }
  next(null, { element: [str] });
}

function body(req = {}, next) {
  const node = (arr = []) => arr.join('');
  next(null, {
    body: `<body>${node(
      ['element', 'script'].map((v) => node(req.props[v]))
    )}</body>`,
  });
}

function meta(req = {}, next) {
  let str = '';
  if (req.props.hasOwnProperty('name') && req.props.hasOwnProperty('content')) {
    const { name, content } = req.props;
    str = `<meta name="${name}" content= "${content}" />`;
  }
  next(null, { meta: [str] });
}

function html(req, next) {
  next(null, {
    html: `<!Doctype html><html lang="kr">${req.props.head || ''}${
      req.props.body || ''
    }</html>`,
  });
}

function pretty(req = {}, next) {
  next(null, beautify(req.props.html || ''));
}

const task = R.curry((fn, args) => {
  const func = fn.bind(null, { props: args });

  return new Promise((resolve, reject) => {
    func((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
});

const pipe = (...fns) =>
  Promise.all(fns).then((res) =>
    res.reduce((a, b) => R.mergeDeepWith(R.concat, a, b), {})
  );

(() => new Promise((resolve) => resolve({})))();
/*.then(() =>
    pipe(
      pipe(
        task(title, { tag: 'style' }),
        task(meta, { name: 'content', content: 'utf-8' }),
        task(meta, { name: 'author', content: 'uznam8x' }),
        task(meta, { name: 'keyword', content: 'mac, ios, android' }),
        task(style, { tag: 'style' }),
        task(link, { tag: 'style' }),
        task(script, { tag: 'style' })
      ).then(task(head)),
      pipe(
        task(element, { tag: 'div' }),
        task(element, { tag: 'div' }),
        task(element, { tag: 'p' }),
        task(script, { tag: 'style' })
      ).then(task(body))
    )
  )*/
pipe(
  task(title, { tag: 'style' }),
  task(meta, { name: 'content', content: 'utf-8' })
)
  .then(task(head))
  .then(task(html))
  .then(task(pretty))
  .then(console.log);
