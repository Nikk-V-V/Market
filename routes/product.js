const {Router} = require('express');
const router = Router();
const controllers = require('../controllers/product');
const check_jwt = require('../middleware/check-jwt');
const upload = require('../middleware/uploads');


router.post('/', check_jwt, upload.single('image'), controllers.create);

router.get('/products/:id', controllers.getByCategory);

router.get('/:id', controllers.getById);

router.get('/', controllers.getAll)

module.exports = router;

