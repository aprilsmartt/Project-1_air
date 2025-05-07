'use strict';

const { SpotImage } = require("../models");
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
      await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="SpotImages"');
    }

    //! Delete existing SpotImages to prevent duplicates
    await queryInterface.bulkDelete('SpotImages', {}, options);


    await queryInterface.bulkInsert('SpotImages', [
      // Spot 1
      {
        spotId: 1,
        url: 'https://example.com/images/spot1_image1.jpg',
        preview: true, //! First image is the preview image. If multiple preview images desired for the same spot, adjust preview to true for the other images
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://example.com/images/spot1_image2.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://example.com/images/spot1_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 2
      {
        spotId: 2,
        url: 'https://example.com/images/spot2_image1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://example.com/images/spot2_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://example.com/images/spot2_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 3
      {
        spotId: 3,
        url: 'https://example.com/images/spot3_image1.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://example.com/images/spot3_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://example.com/images/spot3_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 4
      {
        spotId: 4,
        url: 'https://example.com/images/spot4_image1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://example.com/images/spot4_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://example.com/images/spot4_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 5
      {
        spotId: 5,
        url: 'https://example.com/images/spot5_image1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://example.com/images/spot5_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://example.com/images/spot5_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 6
      {
        spotId: 6,
        url: 'https://example.com/images/spot6_image1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://example.com/images/spot6_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://example.com/images/spot6_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 7
      {
        spotId: 7,
        url: 'https://example.com/images/spot7_image1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://example.com/images/spot7_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://example.com/images/spot7_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 8
      {
        spotId: 8,
        url: 'https://example.com/images/spot8_image1.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://example.com/images/spot8_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://example.com/images/spot8_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Spot 9
      {
        spotId: 9,
        url: 'https://example.com/images/spot9_image1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://example.com/images/spot9_image2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: 'https://example.com/images/spot9_image3.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";  // Keep options for schema support
    return queryInterface.bulkDelete("SpotImages", {}, options);  // Returning the promise
  }
};
