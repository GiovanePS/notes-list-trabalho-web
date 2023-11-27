import { NextFunction, Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from '../database/models/User'
import { UserNote } from "../database/models/UserNote"
import { Note } from "../database/models/Note"
import { userService } from "../services/userService"

export const usersController = {
    // GET /user
    show: async (req: Request, res: Response) => {
        try {
            const user = req.user as User
            res.status(200).json({ username: user.nome, email: user.email })
          } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })     
            }
        }
    },

    // PUT /user
    update: async (req: Request, res: Response) => {
        const user = req.user as User
        const { username, email, password } = req.body
        const hash_password = await bcrypt.hash(password, 10)

        try {
            const updateUser = await userService.update(user.id, {
                nome: username,
                email: email,
                senha_hash: hash_password
            })
            return res.json(updateUser)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })     
            }
        }
    },

    // GET /logout
    logout: (req: Request, res: Response, next: NextFunction) => {
        req.logout(error => {
            if (error) {
              res.status(400).send()
              return next(error)
            }
          })
          res.status(200).send()
    },

    // GET /notes
    notes: async (req: Request, res: Response) => {
        const user = req.user as User
        
        try {
            const user_notes = await UserNote.findAll({
                where: {
                    user_id: user.id
                }
            })

        const allNotes: Note[] = []
        await Promise.all(user_notes.map(async (obj: any) => {
          const note = await Note.findByPk(obj.note_id)
          if (note) {
            allNotes.push(note)
                }
            })
        )
        res.json(allNotes)

      } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })     
            }
        }
    },
}