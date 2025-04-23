'use strict';

/** @type {import('sequelize-cli').Migration} */  //! Need this line of code

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// options.tableName = "Users"; //! options.tablename can go here or inside module.exports object


module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users"; //! can go after options condtional statement OR here.

    //! Note: options should be the first argument throughout
      await queryInterface.addColumn(options, 'firstName', {    // Add firstName column
        type: Sequelize.STRING,
        allowNull: false                                       // Make it optional
      }, options);
    
      await queryInterface.addColumn(options, 'lastName', {     // Add lastName column
        type: Sequelize.STRING,
        allowNull: false                                       // Make it optional
      }, options);
  },

  async down(queryInterface, Sequelize) {
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
