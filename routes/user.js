var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("connected to user route");
});

module.exports = router;
