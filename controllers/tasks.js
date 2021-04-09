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
    const allTasks = await models.Column.findAll({
      raw: true,
    });

    res.json(allTasks);
  } catch (err) {
    next(err);
  }
};

const updateTaskText = async (req, res, next) => {
  try {
    const { text } = req.body;

    const task = await models.Task.update(
      { text },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      },
    );

    if (!task) {
      throw taskNotFoundErr;
    }

    const taskData = task[1].dataValues;

    res.json(taskData);
  } catch (err) {
    next(err);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const task = await models.Task.findByPk(req.params.id);

    if (!task) {
      throw taskNotFoundErr;
    }

    await models.Task.destroy({ where: { id: req.params.id } });

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
