var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");

router.get("/", async function (req, res, next) {
  res.json();
});

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
