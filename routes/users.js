const router = require('express').Router();

const { multerMiddleware } = require('../middlewares/avatar');

const {
  validateUserInfo,
  validateUserRoleId,
} = require('../middlewares/reqValidation');

const controllers = require('../controllers/users');

router.get('/', controllers.getAllUsers);
router.get('/me', controllers.getUser);

router.patch('/me/info', validateUserInfo, controllers.updateUserInfo);
router.patch('/:id/role-id', validateUserRoleId, controllers.updateUserRoleId);

router.post('/me/avatar', multerMiddleware, controllers.updateUserAvatar);

router.delete('/:id', controllers.removeUser);

module.exports = router;
