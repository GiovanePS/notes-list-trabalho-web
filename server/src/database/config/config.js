const path = require('path')
const envPath = path.resolve(__dirname, '..', '..', '..', '.env')
require('dotenv').config({ path: envPath })

module.exports = {
  "production": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres"
  },
  "development": {
    "dialect": 'postgres',
    "host": "localhost",
    "port": 5432,
    "database": 'notes_list',
    "username": "postgres",
    "password": "admin",
  },
}