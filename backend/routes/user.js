const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fs = require('fs');


router.post('/signup', multer, user.signup);
router.post('/login', user.login);
router.delete('/:id', auth, user.deleteUser);
router.put('/:id', auth, multer, user.modifyUser);

module.exports = router
