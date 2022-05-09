const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fs = require('fs');


router.post('/signup', multer, user.signup);
router.post('/login', user.login);
router.delete('/delete/:id', auth, user.deleteUser);
router.put('/update/:id', auth, multer, user.modify);
router.get('/', auth, user.list);


module.exports = router
