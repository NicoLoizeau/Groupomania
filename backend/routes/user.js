const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', user.list);// attention à la sécurité
router.post('/signup', user.signup);
router.post('/login', user.login);
router.delete('/delete', auth, user.deleteUser);

module.exports = router
