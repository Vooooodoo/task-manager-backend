const router = require('express').Router();

const { validateBoardName } = require('../middlewares/reqValidation');
const controllers = require('../controllers/columns');

router.post('/', validateBoardName, controllers.createColumn);
router.get('/', controllers.getBoardColumns);
router.patch(
  '/',
  validateBoardName,
  controllers.updateColumnName,
);
router.patch('/tasks-pos', controllers.updateColumnTasksPos);
router.delete('/', controllers.removeColumn);

module.exports = router;
