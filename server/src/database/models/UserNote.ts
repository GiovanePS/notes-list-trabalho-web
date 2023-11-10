import { DataTypes } from 'sequelize'
import { sequelize } from '../index'
import { User } from './User'
import { Note } from './Note'

export const UserNote = sequelize.define('UserNote', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  note_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'notes',
      key: 'id'
    }
  }
}, {
  tableName: 'user_notes'
})

Note.belongsToMany(User, {through: UserNote})
User.belongsToMany(Note, {through: UserNote})