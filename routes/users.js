const router = require('express').Router();

const { validateUserInfo } = require('../middlewares/reqValidation');
const checkIsForbiddenRout = require('../middlewares/isForbiddenRout');
const controllers = require('../controllers/users');

router.get('/', controllers.getUsers);
//! best practice get me on separate rout
router.get('/me', controllers.getUser);
router.get('/:id', checkIsForbiddenRout, controllers.getUser);
router.patch('/:id', checkIsForbiddenRout, validateUserInfo, controllers.updateUserInfo);
router.delete('/:id', checkIsForbiddenRout, controllers.removeUser);

module.exports = router;
