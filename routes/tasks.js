const router = require('express').Router();

const { validateTaskText } = require('../middlewares/reqValidation');
const checkIsForbiddenRout = require('../middlewares/isForbiddenRout');
const controllers = require('../controllers/tasks');

router.get('/', controllers.getTasks);
router.patch(
  '/:id',
  checkIsForbiddenRout,
  validateTaskText,
  controllers.updateTaskText,
);
router.delete('/:id', checkIsForbiddenRout, controllers.removeTask);

module.exports = router;
