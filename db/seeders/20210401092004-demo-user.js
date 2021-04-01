/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable lines-around-directive */
/* eslint-disable strict */
'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'a',
        lastName: 'b',
        email: 'a@b.ru',
        password: bcrypt.hashSync('11111111', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'c',
        lastName: 'd',
        email: 'c@d.ru',
        password: bcrypt.hashSync('22222222', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'e',
        lastName: 'f',
        email: 'e@f.ru',
        password: bcrypt.hashSync('33333333', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
