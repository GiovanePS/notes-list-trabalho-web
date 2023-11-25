// {
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

const path = require('path')
const envPath = path.resolve(__dirname, '..', '..', '.env')
console.log(envPath)
require('dotenv').config({ path: envPath })

module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'notes_list',
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'dmin',
  },
  test: {},
  production: {}
}