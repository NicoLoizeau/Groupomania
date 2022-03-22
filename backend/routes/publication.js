const express = require('express');
const router = express.Router();
const publication = require('../controllers/publication')

router.get('/', publication.list)

module.exports = router