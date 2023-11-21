import User from "../models/User"
import Note from "../models/Note";
import UserNote from '../models/UserNote'

try {
User.sync({ force: true }).then(() => {
  console.log('Tabela "users" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela "users":', error))

Note.sync({ force: true }).then(() => {
  console.log('Tabela "notes" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela "notes":', error))
} catch (error) {
  console.error(error)
}

UserNote.sync({ force: true }).then(() => {
  console.log('Tabela "user_notes" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela "user_notes":', error))