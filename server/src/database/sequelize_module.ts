import { Sequelize } from 'sequelize'
import path from 'path'
const envPath = path.resolve(__dirname, '..', '..', '.env') /*Caminho para o arquivo .env. Este caminho é construído usando o módulo path para garantir que seja resolvido corretamente, mesmo se o script estiver em um diretório diferente.*/
require('dotenv').config({ path: envPath }) /*Carrega as variáveis de ambiente do arquivo .env no caminho especificado.*/

/*Configuração básica do Sequelize para uma conexão com um banco de dados PostgreSQL */
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