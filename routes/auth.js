const router = require('express').Router();

const { validateNewUser, validateLogin } = require('../middlewares/reqValidation');
const controllers = require('../controllers/auth');

router.post('/sign-up', validateNewUser, controllers.signUp);
router.post('/sign-in', validateLogin, controllers.signIn);

module.exports = router;
