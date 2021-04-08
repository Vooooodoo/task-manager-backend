const models = require('../db/models');
const NotFoundError = require('../errors/NotFoundError');

const columnNotFoundErr = new NotFoundError('There is no column with this id.');

const getColumns = async (req, res, next) => {
  try {
    const allColumns = await models.Column.findAll({
      raw: true,
    });

    res.json(allColumns);
  } catch (err) {
    next(err);
  }
};

const updateColumnName = async (req, res, next) => {
  try {
    const { name } = req.body;

    const column = await models.Column.update(
      { name },
      {
        where: {
          id: req.params.id,
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
    const column = await models.Column.findByPk(req.params.id);

    if (!column) {
      throw columnNotFoundErr;
    }

    await models.Column.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      message: 'The column was successfully deleted.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getColumns,
  updateColumnName,
  removeColumn,
};
