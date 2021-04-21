const router = require('express').Router();

const { validateBoardName } = require('../middlewares/reqValidation');
const controllers = require('../controllers/boards');

router.post('/', validateBoardName, controllers.createBoard);

router.get('/', controllers.getUserBoards);
router.get('/:id', controllers.getBoard);

router.patch(
  '/:id',
  validateBoardName,
  controllers.updateBoardName,
);
router.patch('/:id/columns-order', controllers.updateBoardColumnsOrder);

router.delete('/', controllers.removeBoard);

module.exports = router;
