const model = {
  _b76afcf4: {
    entry: {
      attrs: {},
      node: {
        subject: 'Output',
        description: '',
        rect: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        allow: ['in', 'out'],
      },
      linkage: ['_69ae8cb5'],
    },
    _69ae8cb5: {
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
  },
};

const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const template = require('./func/template');
const R = require('ramda');
const path = require('path');
const handlebar = require('handlebars');

const Entities = require('html-entities').XmlEntities;

const codeline = Object.keys(model).map((dir) => {
  mkdirp.sync(`./${dir}`);

  let source = `const ${dir} = {};`;
  let imt = ``;

  const syntax = Object.keys(model[dir]).map((v) => ({
    import: `import ${dir}${v} from './${dir}/${v}';`,
    code: '',
  }));

  return {
    path: dir,
    syntax: syntax.concat([
      {
        import: `import * as R from 'ramda';`,
        code: `const ${dir} = {}`,
      },
      {
        import: `import pipe from './func/pipe';`,
      },
      {
        import: `import task from './func/task';`,
      },
    ]),
  };

  /*Object.keys(model[dir]).forEach((file) => {
    const val = `${dir}_${file}`;
    imt += `import ${val} from './${dir}/${file}';`;
    source += `${dir}['${file}'] = ${val};`;

    fs.writeFileSync(
      `./${dir}/${file}.js`,
      file === 'entry' ? template.entry : template.component
    );
  });*/
  /*
  code =
    template.dependercy +
    imt +
    source +
    template.pipe +
    template.task +
    template.promise
      .replace('{{output}}', `${dir}.entry`)
      .replace('{{pipeline}}', '');*/
});

//fs.writeFileSync('./test1.js', code);

const createFolder = (args, next) => {
  const dist = path.resolve(__dirname, `./${args.key}`);
  mkdirp.sync(dist);
  next(null, { ...args, dist });
};

const createFile = (args, next) => {
  const files = Object.keys(args.value);
  files.forEach((v) => {
    const dist = `${args.dist}/${v}.js`;
    if (!fs.existsSync(dist)) {
      fs.writeFileSync(
        dist,
        'export default (args, next) => { next(null, args) }'
      );
    }
  });

  next(null, { ...args, files });
};

const createSyntax = (args, next) => {
  const syntax = [
    {
      import: `import * as R from 'ramda';`,
      //code: `const ${args.key} = {};`,
    },
    {
      import: `import pipe from '../func/pipe';`,
    },
    {
      import: `import task from '../func/task';`,
    },
    {
      //code: `const model = ${JSON.stringify(model[args.key])}`,
    },
  ].concat(
    Object.entries(args.value).map((v) => ({
      import: `import ${v[0]} from './${v[0]}';`,
      //code: `${args.key}['${v[0]}'] = ${args.key}${v[0]};`,
    }))
  );

  next(null, { ...args, syntax });
};

const createPipeline = (args, next) => {
  const flow = (instance, index) => {
    let str = `task(${index}, Object.assign( res || {}, { attrs: ${JSON.stringify(
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

  const pipeline = flow(args.value, `entry`);
  next(null, { ...args, pipeline });
};

const createExecute = (args, next) => {
  let source =
    args.syntax.map((v) => v.import || '').join('') +
    args.syntax.map((v) => v.code || '').join('');

  source = handlebar.compile(
    `${source};(() => new Promise((resolve) => resolve({})))().then( res => {{pipeline}} ).then(console.log);`
  )({ pipeline: args.pipeline || '' });

  fs.writeFileSync(`./${args.key}/index.js`, Entities.decode(source));
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
  //console.log(res);
});
