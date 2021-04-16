const models = require('../db/models');
const NotFoundError = require('../errors/NotFoundError');

const taskNotFoundErr = new NotFoundError('There is no task with this id.');
const columnNotFoundErr = new NotFoundError('There is no column with this id.');

const createTask = async (req, res, next) => {
  try {
    const { id, text } = req.body;

    const column = await models.Column.findByPk(id);

    if (!column) {
      throw columnNotFoundErr;
    }

    const taskData = await column.createTask({ text });

    res.status(201).json(taskData);
  } catch (err) {
    next(err);
  }
};

const updateTaskText = async (req, res, next) => {
  try {
    const { id, text } = req.body;

    const task = await models.Task.update(
      { text },
      {
        where: { id },
      },
    );

    if (!task) {
      throw taskNotFoundErr;
    }

    res.json({
      message: 'The task was successfully updated.',
    });
  } catch (err) {
    next(err);
  }
};

const updateTaskColumnId = async (req, res, next) => {
  try {
    const { id, columnId } = req.body;

    const task = await models.Task.update(
      { columnId },
      {
        where: { id },
      },
    );

    if (!task) {
      throw taskNotFoundErr;
    }

    res.json({
      message: 'The task was successfully updated.',
    });
  } catch (err) {
    next(err);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const { id } = req.body;

    const task = await models.Task.findByPk(id);

    if (!task) {
      throw taskNotFoundErr;
    }

    await models.Task.destroy({ where: { id } });

    res.status(200).json({
      message: 'The task was successfully deleted.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  updateTaskText,
  updateTaskColumnId,
  removeTask,
};
