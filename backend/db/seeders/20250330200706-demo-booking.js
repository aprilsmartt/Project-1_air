'use strict';

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}

// Type annotation for better IntelliSense in VS Code
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Reset the auto-increment counter to 1 (SQLite specific)
    if (queryInterface.sequelize.getDialect() === 'sqlite') {
      await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="Bookings"');
    }

    await queryInterface.bulkInsert('Bookings', [
    // await Booking.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-05-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        spotId: 3,
        startDate: new Date('2025-06-10'),
        endDate: new Date('2025-06-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        spotId: 2,
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-07-03'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        spotId: 3,
        startDate: new Date('2025-08-20'),
        endDate: new Date('2025-08-25'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        spotId: 2,
        startDate: new Date('2025-09-05'),
        endDate: new Date('2025-09-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";  // Keep options for schema support
    return queryInterface.bulkDelete("Bookings", {}, options);  // Returning the promise
  }
};
