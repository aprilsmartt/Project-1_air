'use strict';

// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 1,
      },
      {
        userId: 2,
        spotId: 3,
      },
      {
        userId: 3,
        spotId: 2,
      },
      {
        userId: 1,
        spotId: 4,
      },
      {
        userId: 4,
        spotId: 2,      },
      ]);
    },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";  // Keep options for schema support
    return queryInterface.bulkDelete(options, {}, {});  // Returning the promise
  }
};
