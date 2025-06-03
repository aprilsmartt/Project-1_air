'use strict';

const { Spot } = require("../models");
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
      await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="Spots"');
    }
    // //! Delete existing SpotImages to prevent duplicates
    // await queryInterface.bulkDelete('Spots', {}, options);

    options.tableName = "Spots";
    await queryInterface.bulkInsert(options, [
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
        description: 'Explore the beautiful and colorful culture and architecture. Great shops, restaurants, and nightlife.',
        price: 350.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 1,
        address: '101 Bourbon St',
        city: 'New Orleans',
        state: 'LA',
        country: 'USA',
        lat: 29.9584,
        lng: -90.0641,
        name: 'French Quarter Retreat',
        description: 'Steps away from the vibrant nightlife and historic charm of the French Quarter.',
        price: 250.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '202 Sunset Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0983,
        lng: -118.3267,
        name: 'Hollywood Hideaway',
        description: 'Stay in the heart of Hollywood near top attractions, theaters, and nightlife.',
        price: 400.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '303 Peachtree St',
        city: 'Atlanta',
        state: 'GA',
        country: 'USA',
        lat: 33.7490,
        lng: -84.3880,
        name: 'Southern Comfort',
        description: 'Modern southern charm close to downtown Atlanta\'s attractions and dining.',
        price: 220.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 1,
        address: '404 Broadway',
        city: 'Nashville',
        state: 'TN',
        country: 'USA',
        lat: 36.1627,
        lng: -86.7816,
        name: 'Music City Loft',
        description: 'Live in the rhythm of Nashville\'s music scene with this cozy downtown loft.',
        price: 270.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '505 5th Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 40.7532,
        lng: -73.9822,
        name: 'Midtown Modern',
        description: 'Centrally located apartment in Midtown Manhattan, close to everything.',
        price: 500.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '606 Lake Shore Dr',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        lat: 41.9175,
        lng: -87.6548,
        name: 'Windy City Views',
        description: 'Enjoy stunning lake views and proximity to museums, parks, and restaurants.',
        price: 320.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";  // Keep options for schema support
    return queryInterface.bulkDelete(options, {}, {});  // Returning the promise
  }
};
