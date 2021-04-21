const router = require('express').Router();

const { validateBoardName } = require('../middlewares/reqValidation');
const controllers = require('../controllers/columns');

router.post('/', validateBoardName, controllers.createColumn);

router.get('/', controllers.getBoardColumns);

router.patch(
  '/:id',
  validateBoardName,
  controllers.updateColumnName,
);
router.patch('/:id/tasks-order', controllers.updateColumnTasksOrder);

router.delete('/:id', controllers.removeColumn);

module.exports = router;
