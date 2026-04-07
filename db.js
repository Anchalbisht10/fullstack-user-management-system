const mysql = require("mysql2");

// create a connection pool
const db = mysql.createPool({
  host: "localhost",        // your MySQL host
  user: "root",             // your MySQL username
  password: "",             // your MySQL password
  database: "fullstack_db"  // your database name
}).promise();               // use promise for async/await

// optional: test connection
db.getConnection()
  .then(() => console.log("✅ Connected to MySQL database"))
  .catch(err => console.error("❌ MySQL connection error:", err));

module.exports = db;