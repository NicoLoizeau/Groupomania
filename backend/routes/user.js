const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fs = require('fs');

router.get('/', user.list);// attention à la sécurité
router.post('/signup', multer, user.signup);
router.post('/login', user.login);
router.delete('/delete', auth, user.deleteUser);
router.put('/update', auth, multer, user.modifyUser);

module.exports = router
