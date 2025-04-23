'use strict';

const { User } = require ("../models");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}
options.tableName = "SpotImages"; //! options.tablename can go here or inside module.exports object


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(options, 'SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Spots",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      preview: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);  // Use options for schema in production
  },
  //! Use Direct Promise Return instead of await
  async down(queryInterface, Sequelize) {
    // options.tableName = "SpotImages";
    return queryInterface.dropTable(options, "SpotImages");  // for undoing the migration
  }
};