const express = require('express');
const router = express.Router();
const publication = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, publication.newPub);
router.get('/', auth, publication.allPub);
router.get('/:id', auth, publication.onePub);
router.delete('/', auth, publication.delPub);
router.get('/:user/list', auth, publication.myPub);


module.exports = router