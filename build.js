const fs = require("fs-extra");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const path = require("path");
const target = path.resolve(__dirname, "client/build");
const dist = path.resolve(__dirname, "server/public");

rimraf.sync(dist);
fs.renameSync(target, dist);