import express from 'express'
import {sequelize} from './database'

const app = express()
const PORT = 5000

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados bem sucedida.')
  })
  console.log(`Servidor iniciado na porta ${PORT}`)
})