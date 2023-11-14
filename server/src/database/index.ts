import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'notes_list',
  username: 'postgres',
  password: 'admin',
  define: {
    underscored: true
  },
  logging: false
})

export default sequelize