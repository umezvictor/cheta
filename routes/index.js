//rendering static pages
const express = require('express');
const router = express.Router();

//home page
router.get('/', (req, res) => res.send('hello, welcome to cheta'));

module.exports = router;