const express = require('express');
const dictionaryController = require('../controllers/dictionary')
const router = express.Router();

router.get('/all',dictionaryController.getall);
router.get('/search',dictionaryController.search);

module.exports= router;