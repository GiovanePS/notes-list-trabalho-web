import express from "express"
import isAuth from './middlewares/auth'
import { authController } from "./controllers/authController"
import { usersController } from "./controllers/usersController"
import { notesController } from "./controllers/notesController"
import { usersNoteController } from "./controllers/usersNoteController"

const router = express.Router()

// AUTH
router.post('/register', authController.register)
router.post('/login', authController.login)

// USERS
router.get('/user', isAuth, usersController.show)
router.put('/user', isAuth, usersController.update)
router.get('/logout', usersController.logout)

export { router }