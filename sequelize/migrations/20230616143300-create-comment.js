'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      commentId: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        field: 'comment_id'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        field: 'title'
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
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id'
      }
    });
    await queryInterface.addConstraint('comments', {
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
    await queryInterface.dropTable('comments');
  }
};