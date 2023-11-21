import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'

interface NoteAttributes {
  id: number,
  titulo: string,
  texto: string
}

interface NoteCreationAttributes extends Optional<NoteAttributes, 'id'> {}

interface NoteInstance extends Model<NoteAttributes, NoteCreationAttributes>, NoteAttributes {}

export const Note = sequelize.define<NoteInstance, NoteAttributes>('note', {
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