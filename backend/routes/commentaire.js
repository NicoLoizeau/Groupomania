const express = require('express');
const router = express.Router();
const commentaire = require('../controllers/commentaire');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/:id', auth, commentaire.allComPub);
router.post('/:id', auth, multer, commentaire.newCom);
router.delete('/', auth, commentaire.delOneCom);

module.exports = router