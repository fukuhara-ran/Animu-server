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
      },
      content: {
        type: Sequelize.STRING,
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
      commentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "comments",
          key: "commentId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    });
    await queryInterface.addConstraint('replies', {
      fields: ['comment_Id'],
      type: 'foreign key',
      references: {
        table: 'commnets',
        field: 'comment_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("replies");
  }
};
