var express = require("express");
var router = express.Router();

var flow = require("../http/controllers/api/flow");
router.get("/pods", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/flow", flow.show);
router.put("/flow/:id", flow.update);

module.exports = router;
