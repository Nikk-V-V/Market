const {Router} = require('express');
const router = Router();
const controllers = require('../controllers/slide');
const check_jwt = require('../middleware/check-jwt');
const upload = require('../middleware/uploads');


router.post('/', check_jwt, upload.single('image'), controllers.create);

router.get('/', controllers.getAll);

router.patch('/:id', check_jwt, upload.single('image'), controllers.update)

router.delete('/:id', check_jwt, controllers.delete)


module.exports = router;

