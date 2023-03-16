var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth.js');


//Register user
router.post("/register", authController.create);

//Login user
router.post("/login", authController.login);

module.exports = router;