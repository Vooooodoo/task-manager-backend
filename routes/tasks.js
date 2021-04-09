const router = require('express').Router();

const { validateTaskText } = require('../middlewares/reqValidation');
const checkIsForbiddenRout = require('../middlewares/isForbiddenRout');
const controllers = require('../controllers/tasks');

router.post('/', validateTaskText, controllers.createTask);
router.get('/', controllers.getTasks);
router.patch(
  '/',
  checkIsForbiddenRout,
  validateTaskText,
  controllers.updateTaskText,
);
router.delete('/', checkIsForbiddenRout, controllers.removeTask);

module.exports = router;
