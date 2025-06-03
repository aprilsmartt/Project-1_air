'use strict';

const { ReviewImage } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}

// Type annotation for better IntelliSense in VS Code
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Reset the auto-increment counter to 1 (SQLite specific)
    if (queryInterface.sequelize.getDialect() === 'sqlite') {
      await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="ReviewImages"');
    }

    options.tableName = "ReviewImages";
    await queryInterface.bulkInsert(options, [
    // await ReviewImage.bulkCreate([                // Create multiple review-images at once
      {
        reviewId: 1,
        url: 'https://example.com/review-image1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 1,
        url: 'https://example.com/review-image2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 2,
        url: 'https://example.com/review-image3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 3,
        url: 'https://example.com/review-image4.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 3,
        url: 'https://example.com/review-image5.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";  // Keep options for schema support
    return queryInterface.bulkDelete(options, {}, {});  // Returning the promise
  }
};
