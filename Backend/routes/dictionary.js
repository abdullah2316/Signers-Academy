const express = require("express");
const dictionaryController = require("../controllers/dictionary");
const router = express.Router();

router.get("/all", dictionaryController.getall);
router.get("/search", dictionaryController.search);
router.get("/getword/:word", dictionaryController.getword);

module.exports = router;
