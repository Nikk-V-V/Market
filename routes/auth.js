const {Router} = require('express');
const router = Router();
const controllers = require('../controllers/auth');
const auth = require('../middleware/check-jwt')

router.post('/login', controllers.login);

router.post('/register', controllers.register);

router.get('/profile', auth, controllers.getProfile)

module.exports = router;