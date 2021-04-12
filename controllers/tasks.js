const models = require('../db/models');
const NotFoundError = require('../errors/NotFoundError');

const taskNotFoundErr = new NotFoundError('There is no task with this id.');

const createTask = async (req, res, next) => {
  try {
    const { text } = req.body;

    const taskData = await models.Task.create({
      text,
    });

    res.status(201).json(taskData);
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { columnId } = req.body;

    const allTasks = await models.Column.findAll({
      where: {
        columnId,
      },
      raw: true,
    });

    res.json(allTasks);
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
        where: {
          id,
        },
        returning: true,
        plain: true,
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
  getTasks,
  updateTaskText,
  removeTask,
};
