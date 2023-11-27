import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import sequelize from './database/sequelize_module'
import passport from 'passport'
import cors from 'cors'
import './authentication'
import dotenv from 'dotenv'
import path = require('path')
dotenv.config({ path: path.resolve(__dirname, '.env')})
import { router } from "./routes"

const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())
app.use(cors({
  origin: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`,
  credentials: true
}))

app.use(session({
  name: 'session-id',
  secret: process.env.SESSION_SECRET || '_bRZ326bB(z&#$Kw', // SEMPRE DEFINIR SESSION_SECRET no .env
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(router)

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados bem sucedida.')
    })
  console.log(`Servidor iniciado na porta ${PORT}`)
})
