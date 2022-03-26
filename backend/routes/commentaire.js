const express = require('express');
const router = express.Router();
const commentaire = require('../controllers/commentaire')

router.get('/', commentaire.allComPub);
router.post('/', commentaire.newCom);
router.delete('/:id', commentaire.delOneCom);

module.exports = router