import { NextFunction, Request, Response } from "express"
import User from '../database/models/User'
import { UserNote } from "../database/models/UserNote"
import { Note } from "../database/models/Note"

export const usersNotesController = {
    
    //POST /notes/share
    share: async (req: Request, res: Response) => {
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
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message})
            }
        }
    }
}