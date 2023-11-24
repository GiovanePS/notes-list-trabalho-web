import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'

export interface Note {
  id: number,
  titulo: string,
  texto: string
}

interface NoteCreationAttributes extends Optional<Note, 'id'> {}

interface NoteInstance extends Model<Note, NoteCreationAttributes>, Note {}

export const Note = sequelize.define<NoteInstance, Note>('note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  texto: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true,
  tableName: 'notes',
})

export default Note