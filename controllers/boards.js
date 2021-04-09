const models = require('../db/models');
const NotFoundError = require('../errors/NotFoundError');

const boardNotFoundErr = new NotFoundError('There is no board with this id.');

const createBoard = async (req, res, next) => {
  try {
    const { name } = req.body;

    const boardData = await models.Board.create({
      name,
    });

    res.status(201).json(boardData);
  } catch (err) {
    next(err);
  }
};

const getBoards = async (req, res, next) => {
  try {
    const allBoards = await models.Board.findAll({
      raw: true,
    });

    res.json(allBoards);
  } catch (err) {
    next(err);
  }
};

const updateBoardName = async (req, res, next) => {
  try {
    const { name } = req.body;

    const board = await models.Board.update(
      { name },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      },
    );

    if (!board) {
      throw boardNotFoundErr;
    }

    const boardData = board[1].dataValues;

    res.json(boardData);
  } catch (err) {
    next(err);
  }
};

const removeBoard = async (req, res, next) => {
  try {
    const board = await models.Board.findByPk(req.params.id);

    if (!board) {
      throw boardNotFoundErr;
    }

    await models.Board.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      message: 'The board was successfully deleted.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBoard,
  getBoards,
  updateBoardName,
  removeBoard,
};
