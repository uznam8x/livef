import rect from './tasks/rect';
import group from './tasks/group';
import svg from './tasks/svg';
import * as R from 'ramda';

const pipe = (...fns) => Promise.all(fns);

const task = R.curry(
  (fn, args) =>
    new Promise((resolve, reject) => {
      fn.bind(
        null,
        args
      )((err, res) => {
        err ? reject(err) : resolve(res);
      });
    })
);

const parser = (args, next) => {
  const attrs = (param) =>
    Object.entries(param)
      .map((v) => `${v[0]}="${v[1]}" `)
      .join('');

  const element = (node = {}) =>
    R.has('tagName', node)
      ? `<${node.tagName} ${attrs(node.attributes || {})}>${R.map((v) =>
          element(v)
        )(node.children || []).join('')}</${node.tagName}>`
      : '';

  next(null, element(args));
};

const append = (args, next) => {
  const app = document.querySelector('#app');
  app.innerHTML = args;
  next(null, app);
};

(() => new Promise((resolve) => resolve({})))()
  .then(() =>
    pipe(task(group, {}), task(rect, {}).then(task(group)))
      .then(task(group))
      .then(task(svg))
  )
  .then(task(parser))
  .then(task(append));

`
    [meta: Meta = {name: '', content:'' }, meta: Meta = {}] -|Yes|-> head
    [log, nav] --> header
    section --> main
    [header, main] --> body
    [head, body] --> html
    html --> parser --> append --> console.log
`;
