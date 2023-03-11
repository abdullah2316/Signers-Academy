const express = require("express");
let router = express.Router();
const favController = require("../controllers/favourite.js");
const auth = require("../middlewares/verifytoken");

router.post("/add/:wid", auth, favController.add);
router.delete("/remove/:wid", auth, favController.remove);
router.get("/get", auth, favController.get);
module.exports = router;
