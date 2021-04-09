const models = require('../db/models');
const NotFoundError = require('../errors/NotFoundError');

const boardNotFoundErr = new NotFoundError('There is no board with this id.');
const columnNotFoundErr = new NotFoundError('There is no column with this id.');

const createColumn = async (req, res, next) => {
  try {
    const { name } = req.body;

    const board = await models.Board.findByPk(req.params.id);

    if (!board) {
      throw boardNotFoundErr;
    }

    const columnData = await board.createColumn({ name });

    res.status(201).json(columnData);
  } catch (err) {
    next(err);
  }
};

const getColumns = async (req, res, next) => {
  try {
    const board = await models.Board.findByPk(req.params.id);

    if (!board) {
      throw boardNotFoundErr;
    }

    const columns = await board.getColumns();

    res.json(columns);
  } catch (err) {
    next(err);
  }
};

const updateColumnName = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    const column = await models.Column.update(
      { name },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      },
    );

    if (!column) {
      throw columnNotFoundErr;
    }

    const columnData = column[1].dataValues;

    res.json(columnData);
  } catch (err) {
    next(err);
  }
};

const removeColumn = async (req, res, next) => {
  try {
    const { id } = req.body;

    const column = await models.Column.findByPk(id);

    if (!column) {
      throw columnNotFoundErr;
    }

    await models.Column.destroy({ where: { id } });

    res.json({
      message: 'The column was successfully deleted.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createColumn,
  getColumns,
  updateColumnName,
  removeColumn,
};
