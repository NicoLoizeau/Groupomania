const express = require('express');
const router = express.Router();
const publication = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, publication.newPub);
router.get('/', publication.allPub);
router.get('/:id', publication.onePub);
router.get('/:userId', publication.myPub);
router.delete('/:id', auth, publication.delPub);

module.exports = router