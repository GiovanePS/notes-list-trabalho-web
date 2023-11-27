import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from '../database/models/User'
import { userService } from "../services/userService"

export const usersController = {
    // GET /user
    show: async (req: Request, res: Response) => {
        try {
            const user = req.user as User
            res.status(200).json({ username: user.nome, email: user.email })
          } catch (error) {
            console.error(error)
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
}