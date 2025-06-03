'use strict';

const { Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  //! define your schema in options object
}

// Type annotation for better IntelliSense in VS Code
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Reset the auto-increment counter to 1 (SQLite specific)
    if (queryInterface.sequelize.getDialect() === 'sqlite') {
      await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="Reviews"');
    }

    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
    // await Review.bulkCreate([                // Create multiple reviews at once
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

    // Additional reviews for spot 1
    {
      spotId: 1,
      userId: 3,
      review: "The place was nice but the beds were uncomfortable.",
      stars: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      spotId: 1,
      userId: 2,
      review: "Amazing experience! Perfect spot for a romantic getaway.",
      stars: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    // Additional reviews for spot 2
    {
      spotId: 2,
      userId: 3,
      review: "Great location but the place was too noisy. Wouldn't stay again.",
      stars: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      spotId: 2,
      userId: 1,
      review: "Perfect for a weekend escape. The house had everything we needed.",
      stars: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    // Additional reviews for spot 3
    {
      spotId: 3,
      userId: 1,
      review: "An unforgettable experience! Highly recommend for anyone looking for a peaceful retreat.",
      stars: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      spotId: 3,
      userId: 2,
      review: "Nice place, but it was a bit far from everything. The overall experience was good though.",
      stars: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      spotId: 3,
      userId: 3,
      review: "Loved the place, but the weather wasn't great during our stay. Would visit again!",
      stars: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
},

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';  // Keep options for schema support
    return queryInterface.bulkDelete(options, {}, {});  // Returning the promise
  }
};
