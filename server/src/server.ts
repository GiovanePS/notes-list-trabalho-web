import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import sequelize from './database'
import passport from 'passport'
import cors from 'cors'
import './authentication'
import 'dotenv/config'
import User from './database/models/User'

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

app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (error: any, user: any, info: any) => {
    if (!user) return res.status(401).json({ message: "email ou senha incorretos."})

    req.login(user, (error) => {
      if (error) throw error
      res.status(200).send()
    })
  })(req, res, next)
})

app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body
    const newUser = await User.create({
      nome: username,
      email: email,
      senha_hash: password,
    })
  } catch (error) {
    console.error(error)
  }
})

app.get('/logout', (req, res, next) => {
  req.logout(error => {
    if (error) {
      res.status(400).send()
      return next(error)
    }
  })
  res.status(200).send()
})

app.get('/check', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).send()
  } else {
    res.status(401).send()
  }
})

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados bem sucedida.')
    })
  console.log(`Servidor iniciado na porta ${PORT}`)
  })
