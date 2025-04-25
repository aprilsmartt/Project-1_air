'use strict';

const { User } = require("../models");
const bcrypt = require("bcryptjs")  //! Import bcrypt for password hashing

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;     //!Define schema for production
}
// options.tableName = "Users"; //! options.tablename can go here or inside module.exports object

// Type annotation for better IntelliSense in VS Code
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    // Reset the auto-increment counter to 1 (SQLite specific)
    if (queryInterface.sequelize.getDialect() === 'sqlite') {
      await queryInterface.sequelize.query('DELETE FROM sqlite_sequence WHERE name="Users"');
    }

    // await User.bulkCreate([                // Create multiple users at once
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),  // Hash password on the fly
        firstName: "Demo",
        lastName: "Weathers",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "Sam",
        lastName: "Jones",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: "Jane",
        lastName: "Thompson",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });                // Run model validations on seed data

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users'; //! Optional: can place @ top level instead 

    const Op = Sequelize.Op; //! shorthand way (destructuring) === const { Op } = Sequelize;

    //! 3 Arguments used: bulkDelete(tableName, whereCondition, options)
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }  // Delete specific users
    }, options);

    // //! Will delete all records from table (deletes all rows)
    // options.tableName = "Users";  // Keep options for schema support
    // return queryInterface.bulkDelete("Users", {}, options);  // Returning the promise
  }
};

