import express from 'express'
import session from 'express-session'
import sequelize from './database'
import passport from 'passport'
import './passport-config'

const app = express()
const PORT = 5000

app.use(session({
  secret: 'secret', // alterar secret para não ficar hardcoded.
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados bem sucedida.')
  })
  console.log(`Servidor iniciado na porta ${PORT}`)
})