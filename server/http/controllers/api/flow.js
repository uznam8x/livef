const db = require("../../../modules/lowdb");

const create = (req, res, next) => {

}

const show = (req, res, next) => {
    res.send( db.get("flow").value() );
}

const update = (req, res, next) => {
    let data = db.get(`flow`).find({id:req.params.id});
    data.assign(req.body).write();
    res.send( data.value() );
}

const destroy = (req, res, next) => {
    
}

module.exports = { create, show, update, destroy };