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
router.get('/check', authController.check)

// USERS
router.get('/user', isAuth, usersController.show)
router.put('/user', isAuth, usersController.update)
router.get('/logout', usersController.logout)
router.get('/notes',isAuth,usersController.notes)

// NOTES
router.post('/notes', isAuth, notesController.save)
router.put('/notes',isAuth,notesController.update)

export { router }