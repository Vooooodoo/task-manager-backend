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
    email: Joi.string().required().email(),
    about: Joi.string().min(2).max(400),
  }),
});

module.exports = {
  validateNewUser,
  validateLogin,
  validateUserInfo,
};
