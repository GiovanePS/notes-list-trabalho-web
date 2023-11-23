import User from "../models/User"
import Note from "../models/Note";
import UserNote from '../models/UserNote'

const createTables = async () => {
  await User.sync({ force: true }).then(() => {
    console.log('Tabela "users" criada com sucesso!')
  }).catch(error => console.error('Erro ao criar tabela "users":', error))

  await Note.sync({ force: true }).then(() => {
    console.log('Tabela "notes" criada com sucesso!')
  }).catch(error => console.error('Erro ao criar tabela "notes":', error))

  await UserNote.sync({ force: true }).then(() => {
    console.log('Tabela "user_notes" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela "user_notes":', error))
}

createTables()