var express = require("express");
var router = express.Router();
var adminController = require("../controllers/admin.js");

router.get("/getadmin", adminController.getadmin);
router.get("/getusers", adminController.getusers);
router.post("/addword", adminController.addword);
router.post("/updateword", adminController.updateword);
router.post("/removeword", adminController.removeword);
router.post("/removeuser", adminController.removeuser);

module.exports = router;