import express from "express"
import { authController } from "./controllers/authController"
import { usersController } from "./controllers/usersController"
import { notesController } from "./controllers/notesController"
import { usersNoteController } from "./controllers/usersNoteController"

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)



export { router }