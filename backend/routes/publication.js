const express = require('express');
const router = express.Router();
const publication = require('../controllers/publication');
const auth = require('../middleware/auth');

router.post('/', auth, publication.newPub);
router.get('/', publication.allPub);
router.get('/:id', auth, publication.onePub);
router.delete('/:id', auth, publication.delPub);

module.exports = router