import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session' /*configurado para lidar com sessões, usando o SESSION_SECRET do arquivo .env.*/
import sequelize from './database/sequelize_module'
import passport from 'passport'
import cors from 'cors'
import './authentication'
import dotenv from 'dotenv'
import path = require('path')
dotenv.config({ path: path.resolve(__dirname, '.env')}) /*Usado para carregar variáveis de ambiente a partir de um arquivo .env.*/
import { router } from "./routes"

/*Representa a configuração básica de um servidor Express em Node.js, que utiliza Sequelize para interagir com um banco de dados, autenticação com Passport, e suporte a sessões.*/
const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json()) /*Usado para analisar o corpo das solicitações como JSON.*/
app.use(cors({
  origin: 'https://notes-list-client.vercel.app',
  credentials: true,
}))

app.use(session({
  name: 'session-id',
  secret: process.env.SESSION_SECRET || '_bRZ326bB(z&#$Kw', // SEMPRE DEFINIR SESSION_SECRET no .env
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize()) /* Inicializado para suportar autenticação.*/
app.use(passport.session())

app.use(router)

app.listen(PORT, () => { /*app.listen inicia o servidor na porta especificada (PORT). Antes disso, a conexão com o banco de dados é autenticada.*/
  sequelize.authenticate().then(() => { /*A autenticação com o banco de dados é verificada.*/
    console.log('Conexão com o banco de dados bem sucedida.')
    })
  console.log(`Servidor iniciado na porta ${PORT}`)
})
