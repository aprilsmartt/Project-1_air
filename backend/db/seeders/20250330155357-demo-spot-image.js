'use strict';

const { SpotImages } = require ("../models");

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
      await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="SpotImages"');
    }

    // await queryInterface.bulkInsert('SpotImages', [
    await SpotImages.bulkCreate([                // Create multiple spot-images at once
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image1.jpg',
        preview: true, //! First image is the preview image. If multiple preview images desired for the same spot, adjust preview to true for the other images
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image2.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image3.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image1.jpg',
        preview: true, // First image is the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image2.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image3.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image1.jpg',
        preview: true, // First image is the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image2.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image3.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";  // Keep options for schema support
    return queryInterface.bulkDelete("SpotImages", {}, options);  // Returning the promise
  }
};
