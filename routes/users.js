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
}).single('file');

router.get('/', controllers.getAllUsers);
router.get('/me', controllers.getUser);

router.patch('/me', validateUserInfo, controllers.updateUserInfo);
router.patch('/me/avatar', multerMiddleware, controllers.updateUserAvatar);
router.patch('/', validateUserRoleId, controllers.updateUserRoleId);

router.delete('/', validateUserId, controllers.removeUser);

module.exports = router;
