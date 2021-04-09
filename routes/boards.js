const router = require('express').Router();

const { validateBoardName } = require('../middlewares/reqValidation');
const checkIsForbiddenRout = require('../middlewares/isForbiddenRout');
const controllers = require('../controllers/boards');

router.post('/', validateBoardName, controllers.createBoard);
router.get('/', controllers.getBoards);
router.patch(
  '/',
  checkIsForbiddenRout,
  validateBoardName,
  controllers.updateBoardName,
);
router.delete('/', checkIsForbiddenRout, controllers.removeBoard);

module.exports = router;
