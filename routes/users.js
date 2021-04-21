const router = require('express').Router();
const multer = require('multer');

const {
  validateUserInfo,
  validateUserRoleId,
  validateUserId,
} = require('../middlewares/reqValidation');
const { storageConfig, fileFilter } = require('../middlewares/avatar');

const controllers = require('../controllers/users');

const multerMiddleware = multer({
  storage: storageConfig,
  filter: fileFilter,
});

router.get('/', controllers.getAllUsers);
router.get('/me', controllers.getUser);

router.patch('/me', validateUserInfo, controllers.updateUserInfo);
router.patch('/', validateUserRoleId, controllers.updateUserRoleId);

router.post(
  '/me/avatar',
  multerMiddleware.single('file'),
  controllers.updateUserAvatar,
);

router.delete('/', validateUserId, controllers.removeUser);

module.exports = router;
