const express = require('express');
const router = express.Router();
const publication = require('../controllers/publication')

router.post('/newPub', publication.newPub);

module.exports = router