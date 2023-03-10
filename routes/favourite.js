var express = require("express");
var router = express.Router();
var favController = require("../controllers/favourite.js");
const auth = require("../middlewares/verifytoken");
