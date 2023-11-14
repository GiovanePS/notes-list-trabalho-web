import User from "../database/models/User"
import Note from "../database/models/Note";
import UserNote from '../database/models/UserNote'

User.sync({ force: true }).then(() => {
  console.log('Tabela "users" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela "users":', error))

Note.sync({ force: true }).then(() => {
  console.log('Tabela "notes" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela "notes":', error))

UserNote.sync({ force: true }).then(() => {
  console.log('Tabela "user_notes" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela "user_notes":', error))