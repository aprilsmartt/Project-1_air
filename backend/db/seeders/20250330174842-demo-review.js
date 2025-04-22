'use strict';

// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  //! define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Reset the auto-increment counter to 1 (SQLite specific)
    if (queryInterface.sequelize.getDialect() === 'sqlite') {
    await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="Reviews"');
    }

    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: "Great spot with beautiful views. Highly recommend it and would definitely visit again!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 2,
        review: "The location was good, but I would have liked better amenities but good enough if you are on a tight budget.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 1,
        review: "This was a great weekend getaway with good amenities!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';  // Keep options for schema support
    return queryInterface.bulkDelete("Reviews", {}, options);  // Returning the promise
  }
};
