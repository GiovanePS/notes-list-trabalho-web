import express from "express"
import isAuth from './middlewares/auth'
import { authController } from "./controllers/authController"
import { usersController } from "./controllers/usersController"
import { notesController } from "./controllers/notesController"
import { usersNotesController } from "./controllers/usersNotesController"

/*Este arquivo representa as definições de rotas para o app Node.js usando Express. 
Conjunto típico de operações CRUD (Create, Read, Update, Delete) para usuários e notas, juntamente com a funcionalidade de compartilhamento de notas entre usuários.*/

const router = express.Router()

// AUTH
router.post('/register', authController.register) /*Rota para registrar um novo usuário*/
router.post('/login', authController.login) /*Rota para autenticar um usuário.*/
router.get('/check', authController.check) /*Rota para verificar o status da autenticação do usuário.*/

// USERS
router.get('/user', isAuth, usersController.show) /* Rota para obter informações sobre o usuário autenticado.*/
router.put('/user', isAuth, usersController.update) /*Rota para atualizar as informações do usuário autenticado.*/
router.get('/logout', usersController.logout) /* Rota para efetuar logout do usuário autenticado.*/
router.get('/notes', isAuth, usersController.notes) /*Rota para obter as notas do usuário autenticado.*/

// NOTES
router.post('/notes', isAuth, notesController.save) /*Rota para salvar uma nova nota para o usuário autenticado.*/
router.put('/notes', isAuth, notesController.update) /*Rota para atualizar uma nota existente para o usuário autenticado.*/
router.delete('/notes', isAuth, notesController.delete) /*Rota para excluir uma nota existente para o usuário autenticado.*/

// USERSNOTES
router.post('/notes/share', isAuth, usersNotesController.share) /* Rota para compartilhar uma nota com outro usuário autenticado.*/

export { router }