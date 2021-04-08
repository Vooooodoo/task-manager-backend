/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Column }) {
      // define association here
      this.belongsTo(Column, {
        foreignKey: 'columnId',
      });
    }
  }
  Task.init(
    {
      text: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 20],
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );
  return Task;
};
