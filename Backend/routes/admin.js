var express = require("express");
var router = express.Router();
var adminController = require("../controllers/admin.js");

router.get("/getadmin", adminController.getadmin);
router.get("/getusers", adminController.getusers);
router.post("/addword", adminController.addword);
router.post("/updateword/:id", adminController.updateword);
router.post("/removeword/:id", adminController.removeword);
router.post("/removeuser/:id", adminController.removeuser);

module.exports = router;