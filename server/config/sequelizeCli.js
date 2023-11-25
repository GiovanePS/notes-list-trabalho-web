require('dotenv').config()

module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'notes_list',
    username: process.env.SEQ_CLI_USERNAME || 'postgres',
    password: process.env.SEQ_CLI_PASSWORD || 'admin',
  }
}