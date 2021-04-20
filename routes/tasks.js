const router = require('express').Router();

const { validateTaskText } = require('../middlewares/reqValidation');
const controllers = require('../controllers/tasks');

router.post('/', validateTaskText, controllers.createTask);

router.patch(
  '/',
  validateTaskText,
  controllers.updateTaskText,
);
router.patch('/column-id', controllers.updateTaskColumnId);

router.delete('/', controllers.removeTask);

module.exports = router;
