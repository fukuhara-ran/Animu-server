'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.account = user.belongsTo(models.account, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'accountId',
          type: DataTypes.UUID,
          allowNull: true
        }
      })

      this.comment = user.hasMany(models.comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'userId',
          type: DataTypes.UUID,
          allowNull: true
        }
      })

      this.reply = user.hasMany(models.reply, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'userId',
          type: DataTypes.UUID,
          allowNull: true
        }
      })
    }
  }
  user.init({
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      unique: false,
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    underscored: true
  });
  return user;
};