import { DataTypes } from 'sequelize'
import { sequelize } from '../index'

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