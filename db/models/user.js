/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Board }) {
      // define association here
      this.hasMany(Board, {
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
    }
  }

  User.init(
    {
      roleId: DataTypes.INTEGER,
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [2, 40],
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [2, 40],
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 400],
        },
      },
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    },
  );
  return User;
};
