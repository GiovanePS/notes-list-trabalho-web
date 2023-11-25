import { Sequelize } from 'sequelize'
import 'dotenv/config'
import path from 'path'
const envPath = path.resolve(__dirname, '..', '.env')
require('dotenv').config({ path: envPath })

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'notes_list',
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  define: {
    underscored: true
  },
  logging: false
})

export default sequelize