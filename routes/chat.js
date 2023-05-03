var express = require("express");
var router = express.Router();

const auth = require("../middlewares/auth");
const chatController = require("../controllers/chat");

router.get("/imageURL", auth, chatController.getImgURL);
router.post("/replyMessage", auth, chatController.replyMessage);
router.post("/idleVideo", auth, chatController.getIdleVideo);

module.exports = router;
