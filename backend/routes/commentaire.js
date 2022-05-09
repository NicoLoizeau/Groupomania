const express = require('express');
const router = express.Router();
const commentaire = require('../controllers/commentaire');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, commentaire.allComPub);
router.post('/', auth, multer, commentaire.newCom);
router.delete('/:id', auth, commentaire.delOneCom);

module.exports = router