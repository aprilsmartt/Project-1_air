'use strict';

const { User } = require("../models");
const bcrypt = require("bcryptjs")  //! Import bcrypt for password hashing

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}

// Type annotation for better IntelliSense in VS Code
// /** @type {import('sequelize-cli').Migration} */ 
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    
    await queryInterface.createTable('ReviewImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Reviews",
          key: "id"
        },
        onDelete: "CASCADE",
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    }, options);  // Use options for schema in production
  },
  //! Use Direct Promise Return instead of await
  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.dropTable(options);  // for undoing the migration
  }
};