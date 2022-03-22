const express = require('express');
const router = express.Router();
const commentaire = require('../controllers/commentaire')

router.get('/', commentaire.list)

module.exports = router