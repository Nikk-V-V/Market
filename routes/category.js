const {Router} = require('express');
const router = Router();
const controllers = require('../controllers/category');
const check_jwt = require('../middleware/check-jwt');
const upload = require('../middleware/uploads');


router.post('/', check_jwt, upload.single('image'), controllers.create);

router.get('/', controllers.getAll);

router.get('/:id', controllers.getById);



module.exports = router;

