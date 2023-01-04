'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Posts, {
        as: "Posts",
        foreignKey: "nickname",
        sourceKey: "nickname",
        onDelete: "cascade",
      });
      this.hasMany(models.Comments, {
        as: "Comments",
        foreignKey: "nickname",
        sourceKey: "nickname",
        onDelete: "cascade",
      });
      this.hasMany(models.Replies, {
        as: "Replies",
        foreignKey: "nickname",
        sourceKey: "nickname",
        onDelete: "cascade",
      });
    };
  };
  Users.init({
    userId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    loginId: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    nickname: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      unique: true,
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true,
  });
  return Users;
};