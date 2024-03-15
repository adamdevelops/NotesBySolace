// Require SQLite3 verbose module
const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database, and if it doesn't exist, create it
const db = new sqlite3.Database(
  "./notes.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    // Error handling for connection
    if (err) {
      return console.error(err.message);
    } else {
      // Success message for successful connection
      console.log("Connected to the SQLite database.");
    }
  }
);

// Serialize runs to ensure sequential execution
db.serialize(() => {
  // Run SQL command to create table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY,
            title TEXT,
            author TEXT,
            body TEXT,
            date TEXT
        )`,
    (err) => {
      // Error handling for table creation
      if (err) {
        return console.error(err.message);
      }
      console.log("Created notes table");

      // Run SQL command to delete items in notes table
      db.run(`DELETE FROM notes`, (err) => {
        // Error handling for deletion
        if (err) {
          return console.error(err.message);
        }
        console.log("Deleted items in notes table");

        // Sample values for insertion
        const values1 = [
            'My first note!!!',
            'Walter Dean Myers',
            'This embarks my first note of this app',
            '3/11/2024'
          ];
          const values2 = [
            'My second note!!!',
            'Walter Dean Myers',
            'Here we are again with another note',
            '3/11/2024'
          ];
          const values3 = [
            'My third note!!!',
            'Walter Dean Myers',
            'Thrice is the third note',
            '3/11/2024'
          ];
          const values4 = [
            'My 4th note!!!',
            'Walter Dean Myers',
            'My fourth note',
            '3/11/2024'
          ];

        // SQL command for insertion
        const insertSql = `INSERT INTO notes(title, author, body, date) VALUES(?, ?, ?, ?)`;

        // Execute insert commands for each value
        db.run(insertSql, values1, (err) => {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Added notes item with id ${id}`);
        });

        db.run(insertSql, values2, (err) => {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Added notes item with id ${id}`);
        });
        db.run(insertSql, values3, (err) => {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Added notes item with id ${id}`);
        });
        db.run(insertSql, values4, (err) => {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Added notes item with id ${id}`);
        });

        // Close the database connection
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});