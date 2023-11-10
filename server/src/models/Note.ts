import { DataTypes } from 'sequelize'
import { sequelize } from '../database/index'
import { User } from './User'

export const Note = sequelize.define('Note', {
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
  tableName: 'notes'
})

Note.belongsToMany(User, {through: 'user_notes', foreignKey: 'user_id'})