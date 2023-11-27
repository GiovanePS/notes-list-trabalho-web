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
require('dotenv').config({ path: envPath })

module.exports = {
  production: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: 'notes_list',
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
  },
}