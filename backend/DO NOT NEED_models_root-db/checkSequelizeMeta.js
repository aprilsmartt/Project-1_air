const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'your-database-host', // Update this
  username: 'your-username',  // Update this
  password: 'your-password',  // Update this
  database: 'your-database-name',  // Update this
});

async function deleteStaleMigration() {
  const migrationName = '20250326034612-create-spot.js'; // Update this
  try {
    const [results] = await sequelize.query(
      `SELECT * FROM "SequelizeMeta" WHERE name = :name;`, 
      { replacements: { name: migrationName } }
    );
    if (results.length) {
      await sequelize.query(
        `DELETE FROM "SequelizeMeta" WHERE name = :name;`, 
        { replacements: { name: migrationName } }
      );
      console.log(`Deleted migration: ${migrationName}`);
    } else {
      console.log(`Migration not found: ${migrationName}`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

deleteStaleMigration();
