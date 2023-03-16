var express = require("express");
var router = express.Router();
var userController = require("../controllers/user.js");
const auth = require("../middlewares/verifytoken");

//Register user
router.get("/getuser", auth, userController.getuser);
router.post("/getotp", userController.getOTP);
router.post("/verifyotp", userController.verifyOTP);
router.post("/setpassword", userController.setpassword);
router.post("/resetpassword", auth, userController.resetpassword);

module.exports = router;
