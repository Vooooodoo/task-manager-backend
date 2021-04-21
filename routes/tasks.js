const router = require('express').Router();

const { validateTaskText } = require('../middlewares/reqValidation');
const controllers = require('../controllers/tasks');

router.post('/', validateTaskText, controllers.createTask);

router.patch(
  '/:id',
  validateTaskText,
  controllers.updateTaskText,
);
router.patch('/:id/column-id', controllers.updateTaskColumnId);

router.delete('/:id', controllers.removeTask);

module.exports = router;
