'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Mickey Mouse Ln',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0549,
        lng: 118.2426,
        name: 'The Sunny Spot',
        description: 'Great location with activities suitable for all ages. A cozy spot near great restaurants and all your favorite attractions.',
        price: 300.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '456 Beach Boys Blvd',
        city: 'Hawthorne',
        state: 'CA',
        country: 'USA',
        lat: 33.9164,
        lng: 118.3526,
        name: 'Beach Paradise',
        description: 'A beachfront escape.',
        price: 175.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '789 Ocean Dr',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Havana Bliss',
        description: 'Explore the beautiful and colorful culture and architecture. Great shops,restaurants, and nightlife.',
        price: 350.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
