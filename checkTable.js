const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
// const db = new sqlite3.Database('./dev.db'); // replace with your SQLite DB file
const db = new sqlite3.Database('backend/db/dev.db'); // replace with your SQLite DB file

// Function to check if a table exists
function checkTableExists(tableName) {
  const query = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;

  db.get(query, [tableName], (err, row) => {
    if (err) {
      console.error("Error querying the database:", err);
    } else {
      if (row) {
        console.log(`Table "${tableName}" exists.`);
      } else {
        console.log(`Table "${tableName}" does not exist.`);
      }
    }
  });
}

// Check if a specific table (e.g., 'users') exists
checkTableExists('users'); // Replace 'users' with the table you're checking

// Close the database connection
db.close();
