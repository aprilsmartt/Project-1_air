'use strict';

let options = {
  // tableName: 'Users'  // this is the key: explicitly set the tableName here
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// options.tableName = "Users"; //! options.tablename can go here or inside module.exports object

// Type annotation for better IntelliSense in VS Code
// /** @type {import('sequelize-cli').Migration} */ 
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users"; //! can go after options condtional statement OR here.

    //! Note: options should be the first argument throughout
      await queryInterface.addColumn(options, 'firstName', {    // Add firstName column
        type: Sequelize.STRING,
        allowNull: false                                       // Make it optional
      });
    
      await queryInterface.addColumn(options, 'lastName', {     // Add lastName column
        type: Sequelize.STRING,
        allowNull: false                                       // Make it optional
      });
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
  }
};
