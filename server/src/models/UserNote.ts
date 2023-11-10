import { DataTypes } from 'sequelize'
import { sequelize } from '../database/index'

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
  },
  created_at: {
    type: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'user_notes'
})