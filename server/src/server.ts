import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import sequelize from './database/sequelize_module'
import passport from 'passport'
import cors from 'cors'
import './authentication'
import dotenv from 'dotenv'
import path = require('path')
dotenv.config({ path: path.resolve(__dirname, '.env')})
import User from './database/models/User'
import Note from './database/models/Note'
import UserNote from './database/models/UserNote'
import isAuth from './middlewares/auth'
import { router } from "./routes"

const app = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(session({
  name: 'session-id',
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(router)

// apagar uma nota NOTES
app.delete('/notes', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body
    await Note.destroy({
      where: {
        id: id
      }
    })

    await UserNote.destroy({
      where: {
        note_id: id
      }
    })

    res.status(200).send()
  } catch (error) {
    console.error(error)
  }
})

// compartilhar nota com outro usuário. USERSNOTE
app.post('/notes/share', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const { email, note_id } = req.body
    
    const userToShare = await User.findOne({
      where: {
        email: email
      }
    })
    
    if (userToShare) {
      await UserNote.create({
        user_id: userToShare.id,
        note_id: note_id,
        admin_id: user.id,
      })

      res.status(200).send()
    } else {
      res.status(404).send()
    }
  } catch (error) {
    res.status(400).send()
    console.error(error)
  }
})

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados bem sucedida.')
    })
  console.log(`Servidor iniciado na porta ${PORT}`)
})
