import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// Define the GET request handler function
export async function GET(req, res) {
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./notes.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const items = await db.all("SELECT * FROM notes");

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

// Handler for POST requests to create a new note
export async function POST(req, res) {
  // Open a new connection if there is none
  if (!db) {
    db = await open({
      filename: "./notes.db",
      driver: sqlite3.Database,
    });
  }

  // Extract the task from the request body
  const { note } = await req.json();

  const { title, author, body, date } = note;

  // Insert the new note into the "notes" table
  await db.run("INSERT INTO notes(title, author, body, date) VALUES(?, ?, ?, ?)", title, author, body, date);

  // Return a success message as a JSON response with a 200 status code
  return new Response(
    JSON.stringify(
      { message: "success" },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
}

// Handler for PATCH requests to update a note by ID
export async function PATCH(req, res) {
  // Open a new connection if there is none
  if (!db) {
    db = await open({
      filename: "./notes.db",
      driver: sqlite3.Database,
    });
  }

  // Extract the ID and task from the request body
  const { id, note } = await req.json();

  const { title, author, body, date } = note;

  // Update the note with the specified ID in the "notes" table
  await db.run("UPDATE notes SET title = ?, author = ?, body = ?, date = ? WHERE id = ?", title, author, body, date, id);

  // Return a success message as a JSON response with a 200 status code
  return new Response(
    JSON.stringify(
      { message: "success" },
      { headers: { "content-type": "application/json" }, status: 200 }
    )
  );
}