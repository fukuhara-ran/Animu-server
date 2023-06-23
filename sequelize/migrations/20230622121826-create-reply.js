"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("replies", {
      replyId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        field: 'reply_id'
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        field: 'content'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      },
      commentId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'comment_id'
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id'
      }
    });
    await queryInterface.addConstraint('replies', {
      fields: ['comment_id'],
      type: 'foreign key',
      references: {
        table: 'comments',
        field: 'comment_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    await queryInterface.addConstraint('replies', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'user_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("replies");
  }
};
