import User from "../models/User"
import Note from "../models/Note";
import UserNote from '../models/UserNote'
/*Código responsável por criar as tabelas no banco de dados usando o Sequelize*/
const createTables = async () => {   // Cria a tabela "users"
  await User.sync({ force: true }).then(() => {
    console.log('Tabela "users" criada com sucesso!')
  }).catch((error: Error) => console.error('Erro ao criar tabela "users":', error))

  await Note.sync({ force: true }).then(() => {   // Cria a tabela "notes"
    console.log('Tabela "notes" criada com sucesso!')
  }).catch((error: Error) => console.error('Erro ao criar tabela "notes":', error))

  await UserNote.sync({ force: true }).then(() => {  // Cria a tabela "user_notes"
    console.log('Tabela "user_notes" criada com sucesso!')
  }).catch((error: Error) => console.error('Erro ao criar tabela "user_notes":', error))
}

createTables()