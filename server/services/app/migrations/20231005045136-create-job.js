'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Companies"          
          },
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"          
          },
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      jobType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};