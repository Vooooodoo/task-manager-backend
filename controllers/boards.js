const models = require('../db/models');
const NotFoundError = require('../errors/NotFoundError');

const userNotFoundErr = new NotFoundError('There is no user with this id.');
const boardNotFoundErr = new NotFoundError('There is no board with this id.');

const createBoard = async (req, res, next) => {
  try {
    const { name } = req.body;

    const user = await models.User.findByPk(req.user.id);

    if (!user) {
      throw userNotFoundErr;
    }

    const boardData = await user.createBoard({ name });

    res.status(201).json(boardData);
  } catch (err) {
    next(err);
  }
};

const getUserBoards = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.user.id);

    if (!user) {
      throw userNotFoundErr;
    }

    const allBoards = await user.getBoards({
      order: [
        ['id', 'ASC'],
      ],
    });

    res.json(allBoards);
  } catch (err) {
    next(err);
  }
};

const getBoard = async (req, res, next) => {
  try {
    const board = await models.Board.findByPk(req.params.id);

    if (!board) {
      throw boardNotFoundErr;
    }

    res.json(board);
  } catch (err) {
    next(err);
  }
};

const updateBoardName = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    const board = await models.Board.update(
      { name },
      {
        where: { id },
      },
    );

    if (!board) {
      throw boardNotFoundErr;
    }

    res.json({
      message: 'The board was successfully updated.',
    });
  } catch (err) {
    next(err);
  }
};

const updateBoardColumnsPos = async (req, res, next) => {
  try {
    const { id, columnsPos } = req.body;

    const board = await models.Board.update(
      { columnsPos },
      {
        where: { id },
      },
    );

    if (!board) {
      throw boardNotFoundErr;
    }

    res.json({
      message: 'The board was successfully updated.',
    });
  } catch (err) {
    next(err);
  }
};

const removeBoard = async (req, res, next) => {
  try {
    const { id } = req.body;

    const board = await models.Board.findByPk(id);

    if (!board) {
      throw boardNotFoundErr;
    }

    await models.Board.destroy({ where: { id } });

    res.json({
      message: 'The board was successfully deleted.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBoard,
  getUserBoards,
  getBoard,
  updateBoardName,
  updateBoardColumnsPos,
  removeBoard,
};
