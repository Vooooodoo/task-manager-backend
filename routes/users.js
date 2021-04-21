const router = require('express').Router();

const { multerMiddleware } = require('../middlewares/avatar');

const {
  validateUserInfo,
  validateUserRoleId,
  validateUserId,
} = require('../middlewares/reqValidation');

const controllers = require('../controllers/users');

router.get('/', controllers.getAllUsers);
router.get('/me', controllers.getUser);

router.patch('/me', validateUserInfo, controllers.updateUserInfo);
router.patch('/', validateUserRoleId, controllers.updateUserRoleId);

router.post('/me/avatar', multerMiddleware, controllers.updateUserAvatar);

router.delete('/', validateUserId, controllers.removeUser);

module.exports = router;
