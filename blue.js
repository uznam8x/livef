const model = {
  _b76afcf4: {
    type: 'group',
    entry: '_4c347da6',
    subject: 'html',
    description: '',
  },
  _4c347da6: {
    type: 'task',
    attrs: {},
    category: 'node',
    subject: 'Output',
    description: '',
    group: '_b76afcf4',
    linkage: ['_69ae8cb5'],
  },
  _69ae8cb5: {
    type: 'node',
    attrs: {
      lang: 'kr',
    },
    node: {
      subject: 'html',
      description: '',
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      allow: ['in', 'out'],
    },
    linkage: ['_1a93c36e', '_e8c27b46'],
  },
  _1a93c36e: {
    type: 'node',
    attrs: {
      a: 1,
    },
    node: {
      subject: 'head',
      description: '',
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      allow: ['in', 'out'],
    },
    linkage: ['_bfd370f6', '_be5ce90b'],
  },
  _e8c27b46: {
    type: 'node',
    attrs: {},
    node: {
      subject: 'body',
      description: '',
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      allow: ['in', 'out'],
    },
    linkage: [],
  },
  _bfd370f6: {
    type: 'node',
    attrs: {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    node: {
      subject: 'meta',
      description: '',
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      allow: ['in', 'out'],
    },
    linkage: [],
  },
  _be5ce90b: {
    type: 'node',
    attrs: {
      charset: 'utf-8',
    },
    node: {
      subject: 'meta',
      description: '',
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      allow: ['in', 'out'],
    },
    linkage: [],
  },
};

const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const R = require('ramda');
const path = require('path');
const handlebar = require('handlebars');

const Entities = require('html-entities').XmlEntities;

const createFolder = (args, next) => {
  const dist = path.resolve(__dirname, `./src/${args.key}`);
  mkdirp.sync(dist);
  next(null, { ...args, dist });
};

const createFile = (args, next) => {
  const files = Object.keys(args.value).filter((v) => v !== 'entry');
  files.forEach((v) => {
    const dist = `${args.dist}/${v}.js`;
    if (!fs.existsSync(dist)) {
      fs.writeFileSync(
        dist,
        'export default (args, next) => { next(null, {}) }'
      );
    }
  });

  next(null, { ...args, files });
};

const createSyntax = (args, next) => {
  const syntax = [
    {
      import: `import pipe from '../func/pipe';`,
    },
    {
      import: `import task from '../func/task';`,
    },
  ].concat(
    Object.entries(args.value).map((v) => ({
      import: v[0] === 'entry' ? '' : `import ${v[0]} from './${v[0]}';`,
    }))
  );

  next(null, { ...args, syntax });
};

const createPipeline = (args, next) => {
  const flow = (instance, index) => {
    let str = `task(${index}, Object.assign( { props: res || {} }, { attrs: ${JSON.stringify(
      instance[index].attrs || {}
    )} }))`;
    const link = instance[index].linkage;
    if (link.length) {
      str = `pipe( ${link
        .map((v) => flow(instance, `${v}`))
        .join(',')} ).then( res =>  ${str} )`;
    }

    return str;
  };

  const pipeline = flow(args.value, args.value['entry']);
  next(null, { ...args, pipeline });
};

const createExecute = (args, next) => {
  let source =
    args.syntax.map((v) => v.import || '').join('') +
    args.syntax.map((v) => v.code || '').join('');

  source = handlebar.compile(
    `${source};export default (args, next) => { console.log(args); new Promise((resolve) => resolve(null, args || {})).then( res => {{pipeline}} ).then(res => next(null, res)); }`
  )({ pipeline: args.pipeline || '' });

  fs.writeFileSync(`./src/${args.key}/index.js`, Entities.decode(source));
  next(null, { ...args, source });
};

const tasks = R.map((v) => (next) => {
  async.waterfall(
    [
      (next) => {
        const [key, value] = v;
        next(null, { key, value });
      },
      createFolder,
      createFile,
      createSyntax,
      createPipeline,
      createExecute,
    ],
    next
  );
})(Object.entries(model));
async.series(tasks, (err, res) => {
  console.log('done');
});
