import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import sequelize from './database'
import passport from 'passport'
import './passport-config'

const app = express()
const PORT = 5000

app.use(express.json())

app.use(session({
  secret: 'secret', // alterar secret para não ficar hardcoded.
  resave: false,
  saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (error: any, user: any, info: any) => {
    if (!user) return res.status(401).json({ message: "email ou senha incorretos."})

    req.login(user, (error) => {
      if (error) throw error
      res.status(201).json({ user })
    })
  })(req, res, next)
})

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados bem sucedida.')
    })
  console.log(`Servidor iniciado na porta ${PORT}`)
  })
