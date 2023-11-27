import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { userService } from "../services/userService"
import passport from "passport"

// POST /register
export const authController = {
    register: async (req: Request, res: Response) => {
        const { username, email, password } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)

            if (userAlreadyExists) {
                throw new Error ('Este e-mail já está cadastrado.')
            }

            const hash_password = await bcrypt.hash(password, 10)
            const user = await userService.create({
                nome: username,
                email: email,
                senha_hash: hash_password
            })
            
            return res.status(201).json(user)

        }   catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ message: err.message})
                }
        }
    },

// POST /login
    login: async (req: Request, res: Response) => {
        passport.authenticate('local', (error: any, user: any, info: any) => {
            if (!user) return res.status(401).json({ message: "E-mail e/ou senha incorreto(s)."})
        
            req.login(user, (error) => {
              if (error) {
                res.send(401).send()
                throw error
              } else {
                res.status(200).send()
              }
            })
          })(req, res)
    },

// GET /check
    check: (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send()
          } else {
            res.status(401).send()
          }
    }
}