const router = require('express').Router();
const multer = require('multer');

const {
  validateUserInfo,
  validateUserRoleId,
  validateUserId,
} = require('../middlewares/reqValidation');
const { storageConfig, fileFilter } = require('../middlewares/avatar');

const controllers = require('../controllers/users');

//! try to replace to the App.js
router.use(
  multer({ storage: storageConfig, filter: fileFilter }).single('filedata'),
);

router.get('/', controllers.getAllUsers);

router.get('/me', controllers.getUser);
router.patch('/me', validateUserInfo, controllers.updateUserInfo);
router.patch('/me/avatar', controllers.updateUserAvatar);

router.patch('/', validateUserRoleId, controllers.updateUserRoleId);
router.delete('/', validateUserId, controllers.removeUser);

module.exports = router;
