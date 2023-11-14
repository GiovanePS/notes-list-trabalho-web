import express from 'express'
import sequelize from './database'
import passport, { session } from 'passport'
import './auth'

const app = express()
const PORT = 5000

app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados bem sucedida.')
  })
  console.log(`Servidor iniciado na porta ${PORT}`)
})