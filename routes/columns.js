const router = require('express').Router();

const { validateBoardName } = require('../middlewares/reqValidation');
const checkIsForbiddenRout = require('../middlewares/isForbiddenRout');
const controllers = require('../controllers/columns');

router.post('/', validateBoardName, controllers.createColumn);
router.get('/', controllers.getColumns);
router.patch(
  '/',
  checkIsForbiddenRout,
  validateBoardName,
  controllers.updateColumnName,
);
router.delete('/', checkIsForbiddenRout, controllers.removeColumn);

module.exports = router;
