import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import sequelize from './database/sequelize_module'
import passport from 'passport'
import cors from 'cors'
import bcrypt from 'bcrypt'
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

/* // função de login AUTH
app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (error: any, user: any, info: any) => {
    if (!user) return res.status(401).json({ message: "email ou senha incorretos."})

    req.login(user, (error) => {
      if (error) {
        res.send(401).send()
        throw error
      } else {
        res.status(200).send()
      }
    })
  })(req, res, next)
}) */

/* // função de registro AUTH
app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body
    const hash_password = await bcrypt.hash(password, 10)

    await User.create({
      nome: username,
      email: email,
      senha_hash: hash_password,
    })

    res.status(201).send()
  } catch (error) {
    console.error(error)
  }
}) */

// Rota para pegar username e email do usuário. USER
app.get('/user', isAuth, (req: Request, res: Response) => {
  try {
    const user = req.user as User
    res.status(200).json({ username: user.nome, email: user.email })
  } catch (error) {
    console.error(error)
  }
})

// Rota para alterar dados do usuário. USER
app.put('/user', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const { username, email, password } = req.body
    const hash_password = await bcrypt.hash(password, 10)

    await User.update({
      nome: username,
      email: email,
      senha_hash: hash_password
    }, {
      where: {
        id: user.id
      }
    })

    res.status(200).send()
  } catch (error) {
    console.error(error)
  }
})

// função logout USER
app.get('/logout', (req, res, next) => {
  req.logout(error => {
    if (error) {
      res.status(400).send()
      return next(error)
    }
  })
  res.status(200).send()
})

// verificar autenticação (sem ser middleware) AUTH
app.get('/check', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).send()
  } else {
    res.status(401).send()
  }
})

//  enviar todas as notas de um usuário USER
app.get('/notes', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const notes_of_user = await UserNote.findAll({
      where: {
        user_id: user.id
      }
    })

    const allNotes: Note[] = []
    await Promise.all(notes_of_user.map(async (obj: any) => {
      const note = await Note.findByPk(obj.note_id)
      if (note) {
        allNotes.push(note)
      }
    })
    )

    res.json(allNotes)
  } catch (error) {
    console.error(error)
  }
})

// adicionar nota NOTES
app.post('/notes', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const { titulo, texto } = req.body

    if (titulo === '') {
      res.status(400).send()
    } else {
      const newNote = await Note.create({
        titulo: titulo,
        texto: texto
      })

      const assignNote = await UserNote.create({
        user_id: user.id,
        note_id: newNote.id,
        admin_id: user.id
      })

      res.status(200).send()
    }
  } catch (error) {
    console.error(error)
  }
})

// editar nota NOTES
app.put('/notes', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, titulo, texto } = req.body
    if (titulo === '') {
      res.send(400).send()
    } else {
      const noteToEdit = await Note.findByPk(id)
      await noteToEdit?.update({
        titulo: titulo,
        texto: texto
      })

      res.status(200).send()
    }
  } catch (error) {
    res.status(400).send()
    console.error(error)
  }
})

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
