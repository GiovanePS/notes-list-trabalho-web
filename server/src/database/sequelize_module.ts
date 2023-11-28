import { Sequelize } from 'sequelize'
import path from 'path'
const envPath = path.resolve(__dirname, '..', '..', '.env')
require('dotenv').config({ path: envPath })

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialectOptions: {
    ssl: {
      require: true
    }
  },
  define: {
    underscored: true
  },
  logging: false
})

export default sequelize