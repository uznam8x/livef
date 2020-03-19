const root = require("app-root-path");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mkdirp = require("mkdirp");
const storage = path.resolve(root.toString(), "livef/storage/");
mkdirp.sync(storage);
const adapter = new FileSync(`${storage}/database.json`);
const db = low(adapter);

db.defaults({ flow: [], pods: [] }).write();
module.exports = db;
