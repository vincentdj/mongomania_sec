db = db.getSiblingDB('mydatabase');  // Select the database (create if it doesn't exist)

db.createCollection('users');  // Create the users collection

db.users.insertMany([
  {
    name: "Alice",
    email: "alice@example.com",
    password: "password1",
    role: "user"
  },
  {
    name: "Bob",
    email: "bob@example.com",
    password: "Welkom01!",
    role: "user"
  },
  {
    name: "Charlie",
    email: "charlie@example.com",
    password: "Zomer2024",
    role: "user"
  },
  {
    name: "Darwin",
    email: "darwin@example.com",
    password: "Wachtwoord2024!",
    role: "user"
  }
]);
