'use strict';

const { User } = require ("../models");
const bcrypt = require("bcryptjs")  //! Import bcrypt for password hashing

// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await User.bulkCreate([                // Create multiple users at once
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')  // Hash password on the fly
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });                // Run model validations on seed data

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op; //! shorthand way (destructuring) === const { Op } = Sequelize;

    //! 3 Arguments used: bulkDelete(tableName, whereCondition, options)
    return queryInterface.bulkDelete("Users", {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }  // Delete specific users
    }, {});

    // //! Will delete all records from table (deletes all rows)
    // options.tableName = "Users";  // Keep options for schema support
    // return queryInterface.bulkDelete("Users", {}, options);  // Returning the promise
  }
};

