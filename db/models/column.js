/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Board, Task }) {
      // define association here
      this.belongsTo(Board, {
        foreignKey: 'boardId',
      });
      this.hasMany(Task, {
        foreignKey: 'columnId',
        onDelete: 'cascade',
      });
    }
  }
  Column.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 20],
        },
      },
      tasksPos: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      sequelize,
      modelName: 'Column',
    },
  );
  return Column;
};
