const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const boardsRouter = require('./boards');
const columnsRouter = require('./columns');
const tasksRouter = require('./tasks');
const auth = require('../middlewares/auth');

router.use('/', authRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/boards', boardsRouter);
router.use('/columns', columnsRouter);
router.use('/tasks', tasksRouter);

router.use('*', (req, res) => res.status(404)
  .json({
    message: 'The requested resource was not found.',
  }));

module.exports = router;
