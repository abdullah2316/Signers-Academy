var express = require("express");
var router = express.Router();
var recentController = require("../controllers/recent.js");
const auth = require("../middlewares/verifytoken");

router.get("/get", auth, recentController.get);
router.post("/add/:wid", auth, recentController.addrecent);

module.exports = router;
