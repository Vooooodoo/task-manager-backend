const router = require('express').Router();

const { validateTaskText } = require('../middlewares/reqValidation');
const controllers = require('../controllers/tasks');

router.post('/', validateTaskText, controllers.createTask);
router.get('/', controllers.getTasks);
router.patch(
  '/',
  validateTaskText,
  controllers.updateTaskText,
);
router.delete('/', controllers.removeTask);

module.exports = router;
