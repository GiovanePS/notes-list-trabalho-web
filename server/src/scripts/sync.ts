import { sequelize } from "../database";
import { User } from "../database/models/User"
import { Note } from "../database/models/Note";
import { UserNote } from '../database/models/UserNote'

sequelize.sync()

User.sync().then(() => {
  console.log('Tabela "users" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela:', error))

Note.sync().then(() => {
  console.log('Tabela "notes" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela:', error))

UserNote.sync().then(() => {
  console.log('Tabela "user_notes" criada com sucesso!')
}).catch(error => console.error('Erro ao criar tabela:', error))