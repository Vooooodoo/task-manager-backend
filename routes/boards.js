const router = require('express').Router();

const { validateBoardName } = require('../middlewares/reqValidation');
const controllers = require('../controllers/boards');

router.post('/', validateBoardName, controllers.createBoard);
router.get('/', controllers.getUserBoards);
router.get('/:id', controllers.getBoard);
router.patch(
  '/',
  validateBoardName,
  controllers.updateBoardName,
);
router.delete('/', controllers.removeBoard);

module.exports = router;
