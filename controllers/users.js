const models = require('../db/models');

const NotFoundError = require('../errors/NotFoundError');

const userNotFoundErr = new NotFoundError('There is no user with this id.');

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await models.User.findAll({
      raw: true,
      attributes: ['id', 'roleId', 'firstName', 'lastName', 'createdAt'],
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

const updateUserInfo = async (req, res, next) => {
  try {
    const { firstName, lastName, about } = req.body;

    const user = await models.User.update(
      { firstName, lastName, about },
      {
        where: {
          id: req.user.id,
        },
        returning: true,
        plain: true,
      },
    );

    if (!user) {
      throw userNotFoundErr;
    }

    const userData = user[1].toJSON();
    delete userData.password;

    res.json(userData);
  } catch (err) {
    next(err);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    // const { avatar } = req.body;
    console.log(req.file);

    // const user = await models.User.update(
    //   {
    //     avatar: req.file,
    //   },
    //   {
    //     where: {
    //       id: req.user.id,
    //     },
    //     returning: true,
    //     plain: true,
    //   },
    // );

    // if (!user) {
    //   throw userNotFoundErr;
    // }

    // const userData = user[1].toJSON();
    // delete userData.password;

    // res.json(userData);
  } catch (err) {
    res.json(err);
    // next(err);
  }
};

const updateUserRoleId = async (req, res, next) => {
  try {
    const { id, roleId } = req.body;

    const user = await models.User.update(
      { roleId },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      },
    );

    if (!user) {
      throw userNotFoundErr;
    }

    const userData = user[1].toJSON();
    delete userData.password;

    res.json(userData);
  } catch (err) {
    next(err);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const { id } = req.body;

    const user = await models.User.findByPk(id);

    if (!user) {
      throw userNotFoundErr;
    }

    await models.User.destroy({ where: { id } });

    res.status(200).json({
      message: 'The user was successfully deleted.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  updateUserRoleId,
  removeUser,
};
