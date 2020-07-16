const aa = require('./dist/index.js').default;
aa({ a: 1 }, (err, res) => {
  console.log(res);
});
