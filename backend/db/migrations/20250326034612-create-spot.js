'use strict';

// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  //! define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,                       // id cannot be null
        autoIncrement: true,                    // auto-increment the id
        primaryKey: true,                       // define id as the primary key
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,                // Foreign key for the owner of the spot
        allowNull: false,                       // Owner ID is required
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      address: {
        type: Sequelize.STRING(100),            // Address with max length of characters
        allowNull: false,                       // Address is required
      },
      city: {
        type: Sequelize.STRING(100),            // City with max length of characters
        allowNull: false                        // City is required
      },
      state: {
        type: Sequelize.STRING(100),            // State with max length of characters
        allowNull: false                        // State is required
      },
      country: {
        type: Sequelize.STRING(100),            // Country with max length of characters
        allowNull: false                        // Country is required
      },
      lat: {
        type: Sequelize.DECIMAL,                // Latitude for the spot location
        allowNull: false                        // Latitude is required
      },
      lng: {
        type: Sequelize.DECIMAL,                // Longitude for the spot location
        allowNull: false                        // Longitude is required
      },
      name: {
        type: Sequelize.STRING(100),            // Name of the spot with max length of characters
        allowNull: false                        // Name is required
      },
      description: {
        type: Sequelize.STRING(500),            // Description with max length of characters
        allowNull: false                        // Description is required
      },
      price: {
        type: Sequelize.DECIMAL,                // Price of the spot
        allowNull: false                        // Price is required
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

  // async down(queryInterface, Sequelize) {
  //   await queryInterface.dropTable('Users');
  // }

  //! Use Direct Promise Return instead of await
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable("Spots", options);  // for undoing the migration
  }
};
