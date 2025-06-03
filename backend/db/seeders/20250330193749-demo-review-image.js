'use strict';

// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://example.com/review-image1.jpg',
      },
      {
        reviewId: 1,
        url: 'https://example.com/review-image2.jpg',
      },
      {
        reviewId: 2,
        url: 'https://example.com/review-image3.jpg',
      },
      {
        reviewId: 3,
        url: 'https://example.com/review-image4.jpg',
      },
      {
        reviewId: 3,
        url: 'https://example.com/review-image5.jpg',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImage";  // Keep options for schema support
    return queryInterface.bulkDelete("ReviewImage", {}, options);  // Returning the promise
  }
};
