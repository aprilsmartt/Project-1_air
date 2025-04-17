'use strict';

// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image1.jpg',
        preview: true, //! First image is the preview image. If multiple preview images desired for the same spot, adjust preview to true for the other images
      },
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image2.jpg',
        preview: false, // Not the preview image
      },
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image3.jpg',
        preview: false, // Not the preview image
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image1.jpg',
        preview: true, // First image is the preview image
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image2.jpg',
        preview: false, // Not the preview image
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image3.jpg',
        preview: false, // Not the preview image
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image1.jpg',
        preview: true, // First image is the preview image
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image2.jpg',
        preview: false, // Not the preview image
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image3.jpg',
        preview: false, // Not the preview image
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";  // Keep options for schema support
    return queryInterface.bulkDelete("SpotImages", {}, options);  // Returning the promise
  }
};
