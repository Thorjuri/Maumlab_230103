'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comments, {
        as: "Comments",
        foreignKey: "postId",
        sourceKey: "postId",
        onDelete: "cascade",
      });
      this.hasMany(models.Replies, {
        as: "Replies",
        foreignKey: "postId",
        sourceKey: "postId",
        onDelete: "cascade",
      });
    };
  };
  Posts.init({
    postId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contents: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Posts',
    timestamps: true,
  });
  return Posts;
};