import async from "async";
import * as R from "ramda";
import Data from "../src/database/flow.json";

console.clear();
const prc = [];

const add = (args, next) => {
  const { value } = args;
  setTimeout(next, 0, null, { value: value + "a" });
};

const data = R.map(v => {
  v.run = add;
  return v;
})(Data);

const run = R.curry((comp, node, next) => {
  comp.run(comp.param || {}, next);
});

const find = id => {
  const xid = R.findIndex(R.propEq("id", id))(data);
  return data[xid];
};

const exec = R.curry((comp, args, node, next) => {
  const param = R.mergeDeepLeft(args, comp.param || {});
  node = R.mergeDeepLeft(
    {
      id: comp.id,
      request: param,
      response: {},
      time: 0,
      connect: []
    },
    node
  );

  const start = +new Date();

  comp.run(param, (err, ans) => {
    node = R.mergeDeepLeft(
      {
        response: ans,
        time: +new Date() - start
      },
      node
    );
    if (comp.connect.length) {
      node.connect = comp.connect.concat();
      async.series(
        R.map(v => exec(find(v.id), ans, v))(node.connect),
        (err, ans) => {
          next(err, node);
        }
      );
    } else {
      next(err, node);
    }
  });
});

/*
exec(find("ynWgdJJiAvt"), {}, {}, (err, ans) => {
  console.log(ans);
});
*/

import fs from "fs";
import path from "path";
function read(){
    //const js = fs.readFileSync(path.resolve(__dirname, "./test/dynamic.js")).toString("utf8");
    const file = path.resolve(__dirname, "./test/dynamic.js");
    import(`${file}`).then( res => {
        console.log(res);
    });
}
read();
//setInterval(read, 1000);