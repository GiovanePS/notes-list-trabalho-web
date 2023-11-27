const Pool = require("pg").Pool

// Vai precisar ser editado posteriomente.
const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "lists"
})

module.exports = pool