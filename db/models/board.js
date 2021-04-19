/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Column }) {
      // define association here
      // foreignKey set name of db field where will be owner user id
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.hasMany(Column, {
        foreignKey: 'boardId',
        onDelete: 'cascade',
      });
    }
  }
  Board.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 20],
        },
      },
      columnsPos: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      sequelize,
      modelName: 'Board',
    },
  );
  return Board;
};
