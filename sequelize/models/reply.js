"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.user = reply.belongsTo(models.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: {
          name: "userId",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });

      this.comment = reply.belongsTo(models.comment, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: {
          name: "commentId",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
    }
  }
  reply.init(
    {
      replyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        primaryKey: true,
        unique: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "reply",
    }
  );
  return reply;
};
