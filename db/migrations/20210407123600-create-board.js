/* eslint-disable no-unused-vars */
/* eslint-disable lines-around-directive */
/* eslint-disable strict */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
        },
        onDelete: 'cascade',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [1, 20],
        },
      },
      columnsPos: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Boards');
  },
};
