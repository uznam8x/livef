var express = require("express");
var router = express.Router();
var db = require("../modules/lowdb");
router.get("/pods", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/flow", function(req, res, next) {
  res.send( db.get("flow").value() );
});

module.exports = router;
