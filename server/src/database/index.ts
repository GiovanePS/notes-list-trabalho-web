import { Sequelize } from 'sequelize'
import 'dotenv/config'

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