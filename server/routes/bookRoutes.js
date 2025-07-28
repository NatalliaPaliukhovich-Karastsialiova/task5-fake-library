const express = require('express');
const {getBooks, getRegions, generateSeed} = require('../controllers/bookController');

const router = express.Router();

router.get('/books', getBooks);
router.get('/regions', getRegions);
router.get('/seed', generateSeed);

module.exports = router;
