const { celebrate, Joi } = require('celebrate');

const validateNewUser = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().required().min(2).max(40),
    lastName: Joi.string().required().min(2).max(40),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().required().min(2).max(40),
    lastName: Joi.string().required().min(2).max(40),
    about: Joi.string().allow('').min(2).max(400),
  }),
});

const validateUserRoleId = celebrate({
  body: Joi.object().keys({
    roleId: Joi.string().required().pattern(/^(admin|user)$/),
  }),
});

const validateBoardName = celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(20),
  }),
});

const validateTaskText = celebrate({
  body: Joi.object().keys({
    id: Joi.number(),
    text: Joi.string().required().max(20),
  }),
});

module.exports = {
  validateNewUser,
  validateLogin,
  validateUserInfo,
  validateUserRoleId,
  validateBoardName,
  validateTaskText,
};
