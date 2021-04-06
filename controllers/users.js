const models = require('../db/models');
const NotFoundError = require('../errors/NotFoundError');

const userNotFoundErr = new NotFoundError('There is no user with this id.');

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await models.User.findAll({
      raw: true,
    });

    res.json(allUsers);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw userNotFoundErr;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.params.id);

    if (!user) {
      throw userNotFoundErr;
    }

    await models.User.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      message: 'The user was successfully deleted.',
    });
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { name, email, dob } = req.body;

    const user = await models.User.update({ name, email, dob }, {
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      throw userNotFoundErr;
    }

    res.status(200).json({
      message: 'The user was successfully updated.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getUser, removeUser, updateUserInfo,
};
