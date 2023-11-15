import { DataTypes, Model } from 'sequelize'
import sequelize from '../index'

interface NoteAttributes {
  id: number,
  titulo: string,
  texto: string
}

interface NoteCreationAttributes extends NoteAttributes {}

class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
  public id!: number;
  public titulo!: string;
  public texto!: string;
}

Note.init({
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
  modelName: 'note',
  sequelize
})

export default Note