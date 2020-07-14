const fs = require('fs');
const path = require('path');
const async = require('async');

const generate = require('./core/generate');
const temp = require('./core/temp');
const dist = require('./core/dist');
async.waterfall(
  [
    (callback) => {
      const blueprint = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, 'blueprint.json'))
      );
      callback(null, { blueprint });
    },
    temp,
    dist,
    generate,
  ],
  (err, res) => {
    if (err) {
    } else {
      fs.writeFileSync(`${res.tmp}/index.js`, res.source.join('\n'));
    }
  }
);

/*
function head() {
  html({head:''})
}
function body() {
  html({body:''})
}

function html( args ) {
  // 2 input check  
  out(args.head + args.body)
}

function out(msg){
  
  console.log(msg)
}

head();
body();

[] ->
[] -> html[1,2] -> out[1]



{
  head: [ to: 'html' , send: {}],
  body: [ to: 'html', send: {}],
  html:[ head, body, to: 'out' ],
  out:[ ],
}

['meta', 'meta'] -> ['head'] -> ['html'] -> ['out']
          ['div'] -> ['body'] ->

async.series(['meta', 'meta'], html.bind(null));


function head( args, next);
*/
