import { NextFunction, Request, Response } from "express"
import User from '../database/models/User'
import { UserNote } from "../database/models/UserNote"
import { Note } from "../database/models/Note"

export const notesController = {

    // POST /notes - cria uma nota
    save: async (req: Request, res: Response) => {
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
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message})
            }
        }
    },

    // PUT /notes - atualiza uma nota
    update: async (req: Request, res: Response) => {
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
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message})
            }
        }
    },

    // DELETE /notes - exclui uma nota
    delete: async (req: Request, res: Response) => {
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

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message})
            }
        }
    }
}