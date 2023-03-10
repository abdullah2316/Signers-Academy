var express = require("express");
var router = express.Router();
var userController = require("../controllers/user.js");
const auth = require("../middlewares/verifytoken");

//Register user
router.get("/getuser", auth, userController.getuser);

module.exports = router;
