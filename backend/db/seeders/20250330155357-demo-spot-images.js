'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image1.jpg',
        preview: true, //! First image is the preview image. If multiple preview images desired for the same spot, adjust preview to true for the other images
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image2.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,  // First spot
        url: 'https://example.com/images/spot1_image3.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image1.jpg',
        preview: true, // First image is the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image2.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,  // Second spot
        url: 'https://example.com/images/spot2_image3.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image1.jpg',
        preview: true, // First image is the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image2.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,  // Third spot
        url: 'https://example.com/images/spot3_image3.jpg',
        preview: false, // Not the preview image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
