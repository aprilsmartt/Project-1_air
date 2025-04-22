'use strict';

// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'firstName', {    // Add firstName column
      type: Sequelize.STRING,
      allowNull: true                                       // Make it optional
    }, options);
    
    await queryInterface.addColumn('Users', 'lastName', {     // Add lastName column
      type: Sequelize.STRING,
      allowNull: true                                       // Make it optional
    }, options);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // ! If this format doesn't migrate properly, then use the code below
    options.tableName = "Users"; 
    await queryInterface.removeColumn(options, 'firstName');   // Remove in down migration
    await queryInterface.removeColumn(options, 'lastName');    // Remove in down migration

    // // ! Note: when using this code, the User table needs to be referred to first
    // await queryInterface.removeColumn("Users", 'firstName', options);   // Remove in down migration
    // await queryInterface.removeColumn("Users", 'lastName', options);    // Remove in down migration
  }
};
