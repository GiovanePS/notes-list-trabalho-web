import { DataTypes, Model } from 'sequelize'
import sequelize from '../index'
import User from './User'
import Note from './Note'

interface UserNoteAttributes {
  id: number,
  user_id: number,
  note_id: number
}

interface UserNoteCreationAttributes extends UserNoteAttributes {}

class UserNote extends Model<UserNoteAttributes, UserNoteCreationAttributes> implements UserNoteAttributes {
  public id!: number;
  public user_id!: number;
  public note_id!: number;
}

UserNote.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  note_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Note,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'user_notes',
  modelName: 'user_note',
  sequelize
})

Note.belongsToMany(User, {through: UserNote})
User.belongsToMany(Note, {through: UserNote})

export default UserNote