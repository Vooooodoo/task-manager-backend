const router = require('express').Router();
const multer = require('multer');

const { validateUserInfo } = require('../middlewares/reqValidation');
const checkIsForbiddenRout = require('../middlewares/isForbiddenRout');
const { storageConfig, fileFilter } = require('../middlewares/avatar');

const controllers = require('../controllers/users');

router.use(
  multer({ storage: storageConfig, filter: fileFilter }).single('filedata'),
);

router.get('/', controllers.getAllUsers);
router.get('/me', controllers.getUser);
router.get('/:id', checkIsForbiddenRout, controllers.getUser);
router.patch('/me', validateUserInfo, controllers.updateUserInfo);
router.patch(
  '/:id',
  checkIsForbiddenRout,
  validateUserInfo,
  controllers.updateUserInfo,
);
router.patch('/avatar', controllers.updateUserAvatar);
router.delete('/:id', checkIsForbiddenRout, controllers.removeUser);

module.exports = router;
