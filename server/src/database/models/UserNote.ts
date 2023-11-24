import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'
import User from './User'
import Note from './Note'

interface UserNote {
  id: number,
  user_id: number,
  note_id: number,
  admin_id: number,
}

interface UserNoteCreationAttributes extends Optional<UserNote, 'id'> {}

interface UserNoteInstance extends Model<UserNote, UserNoteCreationAttributes>, UserNote {}


export const UserNote = sequelize.define<UserNoteInstance, UserNote>('user_note', {
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
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'user_notes',
})

Note.belongsToMany(User, {through: UserNote, foreignKey: 'note_id'})
User.belongsToMany(Note, {through: UserNote, foreignKey: 'user_id'})

export default UserNote